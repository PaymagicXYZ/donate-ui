import { useState, useEffect } from 'react'
import numeral from 'numeral';
import _ from 'lodash';
import { ethers, Contract } from "ethers";
import { Formik } from 'formik';
import * as csv from 'csvtojson'

import {
  Alert,
  AlertIcon,

  HStack,
  Avatar,
  Box,
  Button,
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
  Progress
} from '@chakra-ui/react'
import { FieldGroup } from '../FieldGroup'
import { HeadingGroup } from '../HeadingGroup'

import { FiSend, FiToggleLeft } from "react-icons/fi";


import {
  Transactor,
  getAddress,
  isAddress,
  isToken,
  getBlockExplorerLink } from "../../../utils";


export default function ERC20Form() {
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState((<></>))
  const [txData, setTxData] = useState({})
  const [status, setStatus] = useState(1);
    // 1 - start | 2 - notValid |  3 - isValid
    // 4 - approveTx | 5 - isApproved | 6 - submitTx
    // 7 - complete

  const [parsedData, setParsedData] = useState({
    token: {
      symbol: '',
      decimals: 0,
      address: '',
      contract: ''
    },

    addressArray: [],
    amountArray: [],
    totalAmount: 0,
    confirmationDetails: ''
  })

  useEffect(() => {
    switch(status) {
      case 0:
        setAlert((
          <Alert status="error">
            <AlertIcon />
            An error has occurred. Please refresh the page and try again.
          </Alert>
        ))
        break;
      case 7:
        setAlert((
          <Alert status="success">
            <AlertIcon />
            (<div>Your transaction is complete! {"\n"}<a href={getBlockExplorerLink(txData.hash,'transaction')} target="_blank">View on Etherscan</a>.</div>)
          </Alert>
        ))
        break;
      default:
    }
  }, [status]);

  async function parseToken(values, errors, setFieldError) {
    console.log('---Parse Form Data---')
    console.log(values)
    console.log(errors)
    console.log(parsedData)

    
    let _token = parsedData.token
    if(values.customTokenAddress && 
      isAddress(values.customTokenAddress) && 
        isToken(values.customTokenAddress)) {

      try {
        _token.contract = new Contract(
          getAddress(values.customTokenAddress),
          paymagicData.contracts['ERC20']['abi'],
          web3Context.provider.getSigner()
        );
        _token.address = values.customTokenAddress
        _token.symbol = await _token.contract.symbol()
        _token.decimals = await _token.contract.decimals()

      }
      catch(err) {
        console.error(err)
        _token = {
          symbol: '',
          decimals: 0,
          address: '',
          contract: ''
        }
        setFieldError('customTokenAddress', 'Unable to find the token. Please try again.')
      }

      setParsedData({...parsedData,
        token: _token
      })
    }
  }

  async function parseRecipients(recipients) {
    let _addressArray = []
    let _amountArray = []
    let _totalAmount = 0

    const converter = csv({
      delimiter: [",","|"," ","="],
      noheader: true,
      trim: true
    })
    let parsed = await converter.fromString(recipients)

    try {
      parsed.forEach( (a,i) =>{
        _addressArray[i] = _.get(a, 'field1', null)
        let temp = _.toNumber(
          _.get(a, 'field2', 0)
        )
        _amountArray[i] = _.isFinite(temp) ? temp : 0 // isFinite excludes NaN
        _totalAmount += _amountArray[i]
      })

      return [
        _addressArray,
        _amountArray,
        _totalAmount
      ]
    }
    catch(err) {
      console.error(err)
      return [
        [],
        [],
        0
      ]
    }
  }

  function getConfirmationDetails(_addressArray, _amountArray, _totalAmount, symbol) {
    let tempDetails = _addressArray.map((a, i) => {
      return `${_addressArray[i]}  ${numeral(_amountArray[i]).format('0,0.0000')} ${symbol}`
    })
    return`${_.join(tempDetails,`\n`)}\n-----\nTOTAL ${numeral(_totalAmount).format('0,0.0000')} ${symbol}\n`
  }

  const validateRules = async values => {
    const errors = {};

    // CUSTOM TOKEN ADDRESS
    if (!values.customTokenAddress) {
      errors.customTokenAddress = 'Required'
    } else if ( !isAddress(values.customTokenAddress) ){
      errors.customTokenAddress = 'Unable to read the token address. Please try again.'
    } else if ( !isToken(values.customTokenAddress) ){
      errors.customTokenAddress = 'Unable to find the token. Please try again.'
    }

    // // RECIPIENTS
    if (!values.recipients) {
      errors.recipients = 'Required';
    } else if (values.addressArray.length === 0 || values.amountArray.length === 0) {
      errors.recipients = 'Required';
    } else if (values.addressArray.length !== values.amountArray.length) {
      errors.recipients = 'Unable to parse the text. Please try again.';
    } else {
      for (let i = 0; i < values.addressArray.length; i++) {
        if(!isAddress(values.addressArray[i]) || !_.isFinite(values.amountArray[i])) {
          errors.recipients = 'Unable to parse the text. Please try again.';
          break;
        }
      }      
    }


    // // Validate Token Balance
    if(parsedData.token.contract && parsedData.totalAmount) {
      let tokenBalanceBN = await parsedData.token.contract["balanceOf"](...[web3Context.address]);

      if (values.totalAmount <= 0 || !_.isFinite(values.totalAmount)) {
        errors.recipients = 'Unable to parse the text. Please try again.';
      } else if(tokenBalanceBN.lt(
          ethers.utils.parseUnits(
            _.toString(values.totalAmount),
            parsedData.token.decimals.toNumber()
          )
        )
      ) {
        errors.recipients = 'Your token balance is too low';
      }      
    }

    return errors;
  };

  async function handleApproval(cb) {
    const totalAmountBN = ethers.utils.parseUnits(
      _.toString(parsedData.totalAmount),
      parsedData.token.decimals
    )
    const tx = Transactor(web3Context.provider, cb, gasPrice);
    tx(parsedData.token.contract["approve"](paymagicData.contracts.disperse.address, totalAmountBN));
  }
  
  async function handleSubmit(cb) {
    const tx = Transactor(web3Context.provider, cb, gasPrice);
    tx(contracts['disperse']["disperseTokenSimple"](parsedData.token.address, parsedData.addressArray, parsedData.amountArray));
  }

  return (
      <Stack spacing="6">
        { alert }
        <Progress colorScheme="purple" size="md" value={20} />
        <Text>{`Step ${_.max([status - 2, 1])} of 5`}</Text>

         <Formik
          initialValues={{
            token: '',
            customTokenAddress: '',
            recipients: '',
            addressArray: [],
            amountArray: [],
            totalAmount: 0
          }}
          validate={ validateRules }
          onSubmit={async (values, actions) => {
            setLoading(true);

            const afterMine = async (txStatus, txData) => {
              console.log(txStatus)
              console.log(txData)
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

            if(status <= 3) {
              // Send ApprovalTx
              setStatus(4);
              handleApproval(afterMine)
            } else if(status === 5) {
              // Send SubmitTx
              setStatus(6);
              handleSubmit(afterMine)
            }
          }}
        >
          { props => {
            useEffect(() => {
              async function run() {
                await parseToken(props.values, props.errors, props.setFieldError)
              }
              run()
            }, [props.values.customTokenAddress]);

            useEffect(() => {
              async function run() {
                let [_addressArray, _amountArray, _totalAmount] =
                  await parseRecipients(props.values.recipients)
                let _details = getConfirmationDetails(_addressArray, _amountArray, _totalAmount, parsedData.token.symbol)
              
                setParsedData({...parsedData,
                  addressArray: _addressArray,
                  amountArray: _amountArray,
                  totalAmount: _totalAmount,
                  confirmationDetails: _details
                })
                if(props.values.recipients !== '') {
                  props.setFieldValue('addressArray', _addressArray)
                  props.setFieldValue('amountArray', _amountArray)
                  props.setFieldValue('totalAmount', _totalAmount)                          
                }
              }
              run()
            }, [props.values.recipients]);

            return (
              <form onSubmit={props.handleSubmit}>

                <FieldGroup>
                  <Stack direction={{ base: 'column', md: 'row' }} width="full" spacing="4">
                    <FormControl id="tokenAddress">
                      <FormLabel fontSize="sm">TOKEN ADDRESS</FormLabel>
                      <Input
                        name='customTokenAddress'
                        value={props.values.customTokenAddress}
                        error={props.errors.customTokenAddress }
                        disabled={status >= 4}
                        placeholder="0x..."
                        onChange={props.handleChange}
                      />
                    </FormControl>
                  </Stack>
                </FieldGroup>

                <FieldGroup>
                  <Stack direction={{ base: 'column', md: 'row' }} width="full" spacing="4">
                    <FormControl id="recipients">
                      <FormLabel fontSize="sm">RECIPIENTS</FormLabel>
                      <Textarea
                        name='recipients'
                        value={props.values.recipients}
                        error={props.errors.recipients }
                        className='height-200'
                        disabled={status >= 4}
                        placeholder={`0xABCDFA1DC112917c781942Cc01c68521c415e, 1${'\n'}0x00192Fb10dF37c9FB26829eb2CC623cd1BF599E8, 2${'\n'}0x5a0b54d5dc17e0aadc383d2db43b0a0d3e029c4c, 3${'\n'}0xEA674fdDe714fd979de3EdF0F56AA9716B898ec8, 4${'\n'}...`}
                        onChange={props.handleChange}
                      />
                      <FormHelperText>Add one wallet address and amount per row, comma separated.</FormHelperText>
                    </FormControl>
                  </Stack>
                </FieldGroup>
                <StackDivider />

                <FieldGroup>
                  <FormLabel fontSize="sm">CONFIRMATION DETAILS</FormLabel>
                  <Text color="gray.500" fontSize="sm">
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
                          disabled={status >= 7}
                          loading={loading}
                        >
                          Send
                        </Button> ) : (
                        <Button
                          size="lg"
                          fontWeight="normal"
                          colorScheme="purple"
                          type="submit"
                          value="Submit"
                          leftIcon={<FiToggleLeft />}
                          disabled={!_.isEmpty(props.errors)}
                          loading={loading}
                        >
                          Approve
                        </Button>
                      )
                    }
                  </FormControl>
                </FieldGroup>
              </form>
            )
          }
        }
        </Formik>
      </Stack>
    )
}