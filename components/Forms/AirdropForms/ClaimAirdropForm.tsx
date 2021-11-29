import { useState, useEffect } from "react";
import numeral from "numeral";
import _ from "lodash";
import { ethers, Contract } from "ethers";
import { parseEther } from "@ethersproject/units";
import { Formik, Form, Field } from "formik";
import * as csv from "csvtojson";

import {
  Alert,
  AlertIcon,
  HStack,
  Avatar,
  Box,
  Button,
  Divider,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Select,
  Input,
  Textarea,
  Switch,
  Text,
  Stack,
  StackDivider,
  StackProps,
  Progress,
  Link
} from "@chakra-ui/react";
import { FieldGroup } from "../FieldGroup";
import { HeadingGroup } from "../HeadingGroup";
import { WalletChecker } from "../../WalletChecker";

import { useWeb3React } from "@web3-react/core";

import { FiSend, FiToggleLeft } from "react-icons/fi";
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { RiHandCoinLine } from "react-icons/ri";

import {
  contractData,
  getAddress,
  isAddress,
  isERC721,
  getBlockExplorerLink,
  getMerkleData
} from "../../../utils";
import Transactor from "../../../utils/Transactor";

import ERC721Contract from "../../../artifacts/@openzeppelin/contracts/token/ERC721/ERC721.sol/ERC721.json";
import DisperseNFTContract from "../../../artifacts/contracts/DisperseNFT.sol/DisperseNFT.json";
import { getDisperseNFTAddress } from "../../../utils/contracts";
// import { useContract } from "../../../hooks/useContract";

import MerkleDistributorContract from "../../../artifacts/contracts/MerkleDistributor.sol/MerkleDistributor.json";
import { useContract } from "../../../hooks/useContract";
import { useMerkleDistributor } from "../../../hooks/useMerkleDistributor";

export default function DisperseNFTForm(props) {
  const { contractAddress } = props
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(<></>);
  const [txData, setTxData] = useState({});
  const [status, setStatus] = useState(1);
  // 1 - start | 2 - notValid |  3 - isValid
  // 4 - claimTx | 5 - complete
  const { library, account, chainId } = useWeb3React();
  const merkleDistributor = useMerkleDistributor(library, account, chainId, contractAddress)

  const [parsedData, setParsedData] = useState({
    recipient: account,
    airdropDisplayStatus: "Checking...",
    checkedAddresses: {}
  });

  useEffect(() => {
    switch (status) {
      case 0:
        setAlert(
          <Alert status="error">
            <AlertIcon />
            An error has occurred. Please refresh the page and try again.
          </Alert>
        );
        break;
      case 5:
        setAlert(
          <Alert status="success">
            <AlertIcon />
            <div>Your transaction is complete!{'\n'}
              <Link href={getBlockExplorerLink(txData.hash ? txData.hash : '0x','transaction')} isExternal>
              View details here.<ExternalLinkIcon mx="1px" pb="2px" />
              </Link>
            </div>
          </Alert>
        );
        break;
      default:
    }
  }, [status]);

  useEffect(() => {
    async function run(walletAddress) {
      setStatus(2) // Default to invalid
      let index
      let airdropDisplayStatus = 'Unable to read the address. Please try again.'
      let checkedAddresses = {}

      console.log(merkleDistributor)

      // Check if address is in Drop
      if(!_.isUndefined(parsedData.checkedAddresses[walletAddress])) {
        index = parsedData.checkedAddresses[walletAddress]
      } else {
        index = merkleDistributor.data.recipients.findIndex(
          r => r.account === walletAddress
        );
        checkedAddresses[walletAddress] = index     
      }

      console.log(index)

      if(index === -1) {
        airdropDisplayStatus = 'Wallet address not found in this airdrop.'
      } else {
        // Check if address has already claimed
        try {
          const isClaimed = await merkleDistributor.contract.isClaimed(ethers.BigNumber.from(index))

          console.log(isClaimed)

          if(isClaimed) {
            airdropDisplayStatus = 'Wallet address already claimed this airdrop.'
          } else {
            airdropDisplayStatus = 'Ready to be claimed.'
            setStatus(3) // Valid
          }
        } catch {
          airdropDisplayStatus = 'An error has occurred.'
          setStatus(0)
        }
      }

      setParsedData({ ...parsedData,
        airdropDisplayStatus: airdropDisplayStatus,
        checkedAddresses: checkedAddresses,
        recipientIndex: index
      });
    }

    let walletAddress = parsedData.recipient ? parsedData.recipient : account
    if (
      walletAddress &&
      isAddress(walletAddress) && 
      merkleDistributor.data && 
      merkleDistributor.data.recipients
    ) {
      run(walletAddress)
    }
  }, [parsedData.recipient, merkleDistributor]);

  async function parseRecipient(value, props) {
    const checkedSumAddress = getAddress(value)
    props.setFieldValue(
      "recipient",
      checkedSumAddress
    );
    setParsedData({ ...parsedData,
      recipient: checkedSumAddress
    });
  }

  async function validateRecipient(value) {
    let error;

    // RECIPIENT ADDRESS
    if (!value) {
      error = "Required";
    } else if (!isAddress(value)) {
      error = "Unable to read the address. Please try again.";
    }

    return error;
  }

  async function handleSubmit(cb) {
    console.log("Send Submit Tx");
    const tx = Transactor(library, cb);

    const tree = createMerkleTree(merkleDistributor.data.recipients)
    const leaf = merkleDistributor.data.recipients[parsedData.index]
    const proof = tree.getProof(parsedData.index, parsedData.recipient, leaf.amount)

    tx(
      merkleDistributor.contract.claim(
        index,
        parsedData.recipient,
        parseEther(`${leaf.amount}`),
        proof
      )
    )
  }

  return (
      <WalletChecker loading={false} account={account} p="5">
        <Stack>
          { alert }
          <Box mt={0}>
            <Progress colorScheme="purple" size="md" isIndeterminate={status===4} value={[15,15,15,15,60,100][status]}/>
            <Text mt={0} align="center" color="gray.500" fontSize="sm">{`Step ${_.max([status - 2, 1])} of 3`}</Text>
          </Box>
          <Box
            px={{ base: '6', md: '6' }}
            pb={{ base: '6', md: '6' }}
          >
            <Formik
              initialValues={{
                recipient: account
              }}
              onSubmit={async (values, actions) => {
                console.log('Submitted...')
                console.log(values)
                console.log(actions)
                setLoading(true);

                const afterMine = async (txStatus, txData) => {
                  // console.log(txStatus)
                  // console.log(txData)
                  setTxData(txData)

                  if(txStatus.code && txStatus.code === 4001) {
                    setStatus(3);
                  } else if(txStatus.code) {
                    console.error(txStatus)
                    setStatus(0);
                  } else {
                    // Set Status to Complete
                    setStatus(5);
                  }
                  setLoading(false);
                }
              setStatus(4);
              handleSubmit(afterMine);
              }
            }
          >
            {(props) => {
                return (
                  <Form onSubmit={props.handleSubmit}>

                    <FieldGroup>
                      <Field name="recipient" validate={validateRecipient}>
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={form.errors.recipient && form.touched.recipient}
                            isDisabled={status >= 4}
                          >
                            <FormLabel htmlFor="recipient" fontSize="sm">RECIPIENT ADDRESS</FormLabel>
                            <Input
                              {...field} 
                              id='recipient'
                              placeholder="0x..."
                              onChange={e => parseRecipient(e.target.value, props)}
                            />
                            <FormErrorMessage>{form.errors.recipient}</FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                    </FieldGroup>


                    <FieldGroup>
                      <FormLabel fontSize="sm">AIRDROP STATUS</FormLabel>
                      <Text color="red.500" fontSize='xl' as='span'>
                        { parsedData.airdropDisplayStatus }
                      </Text>
                    </FieldGroup>
                    <StackDivider />

                    <FieldGroup>
                      <FormControl id="submit">
                        <Button
                          size="lg"
                          fontWeight="normal"
                          colorScheme="purple"
                          type="submit"
                          value="Submit"
                          leftIcon={<RiHandCoinLine />}
                          isDisabled={status !== 3 || !_.isEmpty(props.errors)}
                          isLoading={loading}
                          loadingText="Submitting tx"
                        >
                          Claim
                        </Button>
                    </FormControl>
                  </FieldGroup>
                </Form>
              );
            }}
          </Formik>
        </Box>
      </Stack>
    </WalletChecker>

  );
}
