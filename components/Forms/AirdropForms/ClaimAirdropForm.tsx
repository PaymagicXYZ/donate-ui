import { useState, useEffect } from "react";
import numeral from "numeral";
import _ from "lodash";
import { ethers, Contract } from "ethers";
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
import { getDisperseNFTAddress } from "../../../utils/disperse/index";
// import { useContract } from "../../../hooks/useContract";

import MerkleDistributorContract from "../../../artifacts/contracts/MerkleDistributor.sol/MerkleDistributor.json";
import { useContract } from "../../../hooks/useContract";
import { useMerkleDistributor } from "../../../hooks/useMerkleDistributor";

export default function DisperseNFTForm({match}) {
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(<></>);
  const [txData, setTxData] = useState({});
  const [status, setStatus] = useState(1);
  // 1 - start | 2 - notValid |  3 - isValid
  // 4 - claimTx | 5 - complete
  const { library, account, chainId } = useWeb3React();

  let propsAddress = '0x08a9e551e14bfd1c94e5e3a3f669a458d3f5e403'
  const merkleDistributor = useMerkleDistributor(library, account, chainId, propsAddress)

  const [parsedData, setParsedData] = useState({
    recipient: "",
    confirmationDetails: "",
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

  async function parseRecipient(value, props) {
    console.log(value)
    let { values, errors, setFieldError, setFieldValue} = props
    setFieldValue(
      "recipient",
      value
    );

    // Check is address
    // Check is in the Airdrop
    // Check whether claimed yet
    // Check claimed amount



    // Check Drop Status
    if (
      value &&
      isAddress(value) &&
      isERC721(value)
    ) {
      try {
        _token.contract = new Contract(
          getAddress(value),
          ERC721Contract.abi,
          library.getSigner(account)
        );
        _token.address = value;
        _token.name = await _token.contract.name()
        _token.symbol = await _token.contract.symbol()

      } catch (err) {
        console.error(err);
        _token = {
          name: "",
          symbol: "",
          tokenURI: "",
          address: "",
          contract: {},
        }
        setFieldError(
          "customTokenAddress",
          "Unable to find the NFT. Please try again."
        );
      }

      console.log('_token',_token)
      setParsedData({ ...parsedData, token: _token });
    }
  }

  function getConfirmationDetails(
    _addressArray,
    _indexArray,
    _totalAmount,
    symbol
  ) {
    let tempDetails = _addressArray.map((a, i) => {
      return `${_addressArray[i]}  ${numeral(_indexArray[i]).format(
        '0,0.0000'
      )} ${symbol}`
    })
    return _.join(tempDetails,'\n') + '\n' +
      `-----${"\n"}
        TOTAL ${numeral(
          _totalAmount
        ).format('0,0.0000')} ${symbol}${"\n"}
      `
  }

  async function validateRecipient(value) {
    let error;

    // RECIPIENT ADDRESS
    if (!value) {
      error = "Required";
    } else if (!isAddress(value)) {
      error = "Unable to read the address. Please try again.";
    }


    // Check is address
    // Check is in the Airdrop
    // Check whether claimed yet


    return error;
  }

  async function handleSubmit(cb) {
    console.log("Send Submit Tx");

    const tx = Transactor(library, cb);
    tx(
      contract["disperseTokenERC721"](
        parsedData.token.address,
        parsedData.addressArray,
        parsedData.indexArray
      )
    );
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
                    if(status >= 5) {
                      setStatus(5);
                    } else if(status <= 4) {
                      setStatus(3);
                    }
                  } else if(txStatus.code) {
                    console.error(txStatus)
                    setStatus(0);
                  } else if(status >= 5) {
                    // Set Status to Complete
                    setStatus(7);
                  } else if(status <= 4) {
                    // Set Status to isApproved
                    setStatus(5);
                  }
                  setLoading(false);
                }

              if (status <= 3) {
                // Send ApprovalTx
                setStatus(4);
                handleApproval(afterMine);
              } else if (status === 5) {
                // Send SubmitTx
                setStatus(6);
                handleSubmit(afterMine);
              }
            }}
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

                    <Divider mt={6} mb={2}/>

                    <FieldGroup>
                      <FormLabel fontSize="sm">AIRDROP STATUS</FormLabel>
                      <Text color="gray.500" fontSize='sm' as='span'>
                        { parsedData.confirmationDetails }
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
                          isDisabled={!_.isEmpty(props.errors)}
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
