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
} from "@chakra-ui/react";
import { FieldGroup } from "../FieldGroup";
import { HeadingGroup } from "../HeadingGroup";
import { useWeb3React } from "@web3-react/core";

import { FiSend, FiToggleLeft } from "react-icons/fi";

import {
  contractData,
  getAddress,
  isAddress,
  isToken,
  getBlockExplorerLink,
} from "../../../utils";
import Transactor from "../../../utils/Transactor";
import ERC20Contract from "../../../artifacts/@openzeppelin/contracts/token/ERC20/ERC20.sol/ERC20.json";
import DisperseContract from "../../../artifacts/contracts/Disperse.sol/Disperse.json";
import { getDisperseAddress } from "../../../utils/disperse/index";
// import useGasPrice from "../../../hooks/useGasPrice";
import { useContract } from "../../../hooks/useContract";

export default function ERC721Form() {
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(<></>);
  const [txData, setTxData] = useState({});
  const [status, setStatus] = useState(1);
  // 1 - start | 2 - notValid |  3 - isValid
  // 4 - approveTx | 5 - isApproved | 6 - submitTx
  // 7 - complete
  const { library, account, chainId } = useWeb3React();
  const contract = useContract(
    library,
    DisperseContract,
    getDisperseAddress(chainId)
  );


  const [parsedData, setParsedData] = useState({
    token: {
      symbol: "",
      decimals: 0,
      address: "",
      contract: {},
    },

    addressArray: [],
    amountArray: [],
    totalAmount: 0,
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
      case 7:
        setAlert(
          <Alert status="success">
            <AlertIcon />
            <div>Your transaction is complete!{'\n'}
              <a href={getBlockExplorerLink(txData.hash ? txData.hash : '0x','transaction')} target="_blank" rel="noreferrer">View Transaction details here.</a>
            </div>
          </Alert>
        );
        break;
      default:
    }
  }, [status]);

  async function parseToken(values, errors, setFieldError) {
    let _token = {
      symbol: "",
      decimals: 0,
      address: "",
      contract: {},
    }
    if (
      values.customTokenAddress &&
      isAddress(values.customTokenAddress) &&
      isToken(values.customTokenAddress)
    ) {
      try {
        _token.contract = new Contract(
          getAddress(values.customTokenAddress),
          ERC20Contract.abi,
          library.getSigner(account)
        );
        _token.address = values.customTokenAddress;
        _token.decimals = await _token.contract.decimals()
        _token.symbol = await _token.contract.symbol()

      } catch (err) {
        console.error(err);
        _token = {
          symbol: "",
          decimals: 0,
          address: "",
          contract: {},
        };
        setFieldError(
          "customTokenAddress",
          "Unable to find the token. Please try again."
        );
      }

      setParsedData({ ...parsedData, token: _token });
      parseRecipients(values.recipients)
    }
  }

  async function parseRecipients(recipients) {
    let _addressArray = [];
    let _amountArray = [];
    let _totalAmount = 0;

    const converter = csv({
      delimiter: [",", "|", " ", "="],
      noheader: true,
      trim: true,
    });
    let parsed = await converter.fromString(recipients);

    try {
      parsed.forEach((a, i) => {
        _addressArray[i] = _.get(a, "field1", null);
        let temp = _.toNumber(_.get(a, "field2", 0));
        _amountArray[i] = _.isFinite(temp) ? temp : 0; // isFinite excludes NaN
        _totalAmount += _amountArray[i];
      });

      return [_addressArray, _amountArray, _totalAmount];
    } catch (err) {
      console.error(err);
      return [[], [], 0];
    }
  }

  function getConfirmationDetails(
    _addressArray,
    _amountArray,
    _totalAmount,
    symbol
  ) {
    let tempDetails = _addressArray.map((a, i) => {
      return `${_addressArray[i]}  ${numeral(_amountArray[i]).format(
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

  async function parseAndValidateRecipients(value) {
    let error;

    // Parse
    let [_addressArray, _amountArray, _totalAmount] = await parseRecipients(
      value
    );
    let _details = getConfirmationDetails(
      _addressArray,
      _amountArray,
      _totalAmount,
      parsedData.token.symbol
    );

    setParsedData({
      ...parsedData,
      addressArray: _addressArray,
      amountArray: _amountArray,
      totalAmount: _totalAmount,
      confirmationDetails: _details,
    });

    // Validate
    if (!value) {
      error = "Required";
    } else if (_addressArray.length === 0 || _amountArray.length === 0) {
      error = "Required";
    } else if (_addressArray.length !== _amountArray.length) {
      error = "Unable to parse the text. Please try again. 1";
    } else {
      for (let i = 0; i < _addressArray.length; i++) {
        if (!isAddress(_addressArray[i]) || !_.isFinite(_amountArray[i])) {
          error = "Unable to parse the text. Please try again. 2";
          break;
        }
      }
    }

    // Validate Token Balance
    if(parsedData.token.contract && parsedData.totalAmount) {
      let tokenBalanceBN = await parsedData.token.contract.balanceOf(account);
      if (_totalAmount <= 0 || !_.isFinite(_totalAmount)) {
        errors.recipients = 'Unable to parse the text. Please try again.';
      } else if(tokenBalanceBN.lt(
          ethers.utils.parseUnits(
            _.toString(_totalAmount),
            parsedData.token.decimals
          )
        )
      ) {
        errors.recipients = 'Your token balance is too low';
      }
    }

    return error;
  }

  async function validateCustomTokenAddress(value) {
    let error;

    // CUSTOM TOKEN ADDRESS
    if (!value) {
      error = "Required";
    } else if (!isAddress(value)) {
      error = "Unable to read the token address. Please try again.";
    } else if (!isToken(value)) {
      error = "Unable to find the token. Please try again.";
    }

    return error;
  }

  async function handleApproval(cb) {
    console.log("Send Approval Tx");
    const totalAmountBN = ethers.utils.parseUnits(
      _.toString(parsedData.totalAmount),
      parsedData.token.decimals
    );
    const tx = Transactor(library, cb);
    tx(
      parsedData.token.contract["approve"](
        getDisperseAddress(chainId),
        totalAmountBN
      )
    );
  }

  async function handleSubmit(cb) {
    console.log("Send Approval Tx");

    const amountArrayBN = parsedData.amountArray.map( i => {
      return ethers.utils.parseUnits(
        _.toString(i),
        parsedData.token.decimals
      );
    })


    const tx = Transactor(library, cb);
    tx(
      contract["disperseTokenSimple"](
        parsedData.token.address,
        parsedData.addressArray,
        amountArrayBN
      )
    );
  }

  return (
      <Stack>
        { alert }
        <Box mt={0}>
          <Progress colorScheme="purple" size="md" isIndeterminate={status===4 || status===6} value={[15,15,15,15,30,55,70,100][status]}/>
          <Text mt={0} align="center" color="gray.500" fontSize="sm">{`Step ${_.max([status - 2, 1])} of 5`}</Text>
        </Box>
         <Formik
          initialValues={{
            token: '',
            customTokenAddress: '',
            recipients: '',
            addressArray: [],
            amountArray: [],
            totalAmount: 0
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
{/*            useEffect(() => {
              async function run() {
                await parseToken(props.values, props.errors, props.setFieldError)
                parseRecipients(props.values.recipients)
              }
              run()
            }, [props.values.customTokenAddress]);*/}

            return (
              <Form onSubmit={props.handleSubmit}>

                <FieldGroup>
                  <Field name="customTokenAddress" validate={validateCustomTokenAddress}>
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={form.errors.customTokenAddress && form.touched.customTokenAddress}
                        isDisabled={status >= 4}
                      >
                        <FormLabel htmlFor="customTokenAddress" fontSize="sm">TOKEN ADDRESS</FormLabel>
                        <Input
                          {...field} 
                          id='customTokenAddress'
                          placeholder="0x..."
                          onChange={e => parseToken(props.values, props.errors, props.setFieldError)}
                        />
                        <FormHelperText>{parsedData.token.symbol ? `${parsedData.token.symbol} Token` : null}</FormHelperText>
                        <FormErrorMessage>{form.errors.customTokenAddress}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </FieldGroup>

                <FieldGroup>
                  <Field name="recipients" validate={parseAndValidateRecipients}>
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={form.errors.recipients && form.touched.recipients}
                        isDisabled={status >= 4}
                      >
                        <FormLabel htmlFor="recipients" fontSize="sm">RECIPIENTS</FormLabel>
                        <Textarea
                          {...field} 
                          id='recipients'
                          placeholder={`0xABCDFA1DC112917c781942Cc01c68521c415e, 1${'\n'}0x00192Fb10dF37c9FB26829eb2CC623cd1BF599E8, 2${'\n'}0x5a0b54d5dc17e0aadc383d2db43b0a0d3e029c4c, 3${'\n'}0xEA674fdDe714fd979de3EdF0F56AA9716B898ec8, 4${'\n'}...`}
                          h={200}
                        />
                        <FormErrorMessage>{form.errors.recipients}</FormErrorMessage>
                        <FormHelperText>Add one wallet address and amount per row, comma separated.</FormHelperText>
                      </FormControl>
                    )}
                  </Field>
                </FieldGroup>

                <Divider mt={6} mb={2}/>

                <FieldGroup>
                  <FormLabel fontSize="sm">CONFIRMATION DETAILS</FormLabel>
                  <Text color="gray.500" fontSize='sm' as='span'>
                    { parsedData.confirmationDetails }
                  </Text>
                </FieldGroup>
                <StackDivider />

                <FieldGroup>
                  <FormControl id="submit">
                    { 
                      (status >= 5) ? (
                        <Button
                          size="lg"
                          fontWeight="normal"
                          colorScheme="purple"
                          type="submit"
                          value="Submit"
                          leftIcon={<FiSend />}
                          isDisabled={status >= 7}
                          isLoading={loading}
                          loadingText="Submitting tx"
                        >
                          Send
                        </Button>
                      ) : (
                        <Button
                          size="lg"
                          fontWeight="normal"
                          colorScheme="purple"
                          type="submit"
                          value="Submit"
                          leftIcon={<FiToggleLeft />}
                          isDisabled={!_.isEmpty(props.errors)}
                          isLoading={loading}
                          loadingText="Submitting tx"
                        >
                          Approve
                        </Button>
                    )}
                </FormControl>
              </FieldGroup>
            </Form>
          );
        }}
      </Formik>
    </Stack>
  );
}
