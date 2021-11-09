import { useMemo, useState, useEffect } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import {
  Button,
  Box,
  Container,
  Radio,
  RadioGroup,
  Flex,
  Heading,
  Input,
  Text,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Image,
  Stack,
  Alert,
  AlertIcon,
  useToast,
  Spacer,
  Divider,
  Textarea,
  SimpleGrid,
} from "@chakra-ui/react";
import { ethers, utils } from "ethers";

import { AddressesContext } from "../../contexts";
import { useWeb3React } from "@web3-react/core";

import { Progress } from "@chakra-ui/progress";
import { isAddress } from "@ethersproject/address";

// import AddressList from "../../components/AddressList";
// import CampaignForm from "../../components/CampaignForm";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Sidebar from "../../components/Sidebar/Sidebar";
import ConnectionAlert from "../../components/ConnectionAlert";
import Link from "next/link";
// import { useGasPrice } from "../../../hooks/useGasPrice";
import { getBlockExplorerLink } from "../../utils";

function DispersePage() {
  const { library, account, chainId } = useWeb3React();
  const [addresses, setAddresses] = useState();
  const providerAddresses = useMemo(
    () => ({ addresses, setAddresses }),
    [addresses, setAddresses]
  );

  //   const gasPrice = useGasPrice("fast");
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ title: "", color: "primary" });
  const [txData, setTxData] = useState({});
  const [status, setStatus] = useState(1);
  const [tokenAddress, setTokenAddress] = useState("");

  const [parsedData, setParsedData] = useState({
    token: {
      symbol: "",
      decimals: 0,
      address: "",
      contract: "",
    },

    addressArray: [],
    amountArray: [],
    totalAmount: 0,
    confirmationDetails: "",
  });

  useEffect(() => {
    switch (status) {
      case 0:
        setAlert({
          info: (
            <div>
              An error has occurred. Please refresh the page and try again.
            </div>
          ),
          color: "danger",
        });
        break;
      case 7:
        setAlert({
          info: (
            <div>
              Your transaction is complete! {"\n"}
              <a
                href={getBlockExplorerLink(txData.hash, "transaction")}
                target="_blank"
                rel="noreferrer"
              >
                View on Etherscan
              </a>
              .
            </div>
          ),
          color: "success",
        });
        break;
      default:
    }
  }, [status]);

  async function parseToken(values, errors, setFieldError) {
    // console.log('---Parse Form Data---')
    // console.log(values)
    // console.log(errors)
    // console.log(parsedData)

    let _token = parsedData.token;
    if (
      values.customTokenAddress &&
      isAddress(values.customTokenAddress) &&
      isToken(values.customTokenAddress)
    ) {
      try {
        _token.contract = new Contract(
          getAddress(values.customTokenAddress),
          paymagicData.contracts["ERC20"]["abi"],
          web3Context.provider.getSigner()
        );
        _token.address = values.customTokenAddress;
        _token.symbol = await _token.contract.symbol();
        _token.decimals = await _token.contract.decimals();
      } catch (err) {
        console.error(err);
        _token = {
          symbol: "",
          decimals: 0,
          address: "",
          contract: "",
        };
        setFieldError(
          "customTokenAddress",
          "Unable to find the token. Please try again."
        );
      }

      setParsedData({ ...parsedData, token: _token });
    }
  }

  async function parseRecipients(recipients) {
    let _addressArray = [];
    let _amountArray = [];
    let _totalAmount = 0;

    const converter = csv({
      delimiter: [",", "|"],
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
        "0,0.0000"
      )} ${symbol}`;
    });
    return `${_.join(tempDetails, `\n`)}\n-----\nTOTAL ${numeral(
      _totalAmount
    ).format("0,0.0000")} ${symbol}\n`;
  }

  const validateRules = async (values) => {
    const errors = {};

    // CUSTOM TOKEN ADDRESS
    if (!values.customTokenAddress) {
      errors.customTokenAddress = "Required";
    } else if (!isAddress(values.customTokenAddress)) {
      errors.customTokenAddress =
        "Unable to read the token address. Please try again.";
    } else if (!isToken(values.customTokenAddress)) {
      errors.customTokenAddress = "Unable to find the token. Please try again.";
    }

    // RECIPIENTS
    if (!values.recipients) {
      errors.recipients = "Required";
    } else if (
      values.addressArray.length === 0 ||
      values.amountArray.length === 0
    ) {
      errors.recipients = "Required";
    } else if (values.addressArray.length !== values.amountArray.length) {
      errors.recipients = "Unable to parse the text. Please try again.";
    } else {
      for (let i = 0; i < values.addressArray.length; i++) {
        if (
          !isAddress(values.addressArray[i]) ||
          !_.isFinite(values.amountArray[i])
        ) {
          errors.recipients = "Unable to parse the text. Please try again.";
          break;
        }
      }
    }

    // Validate Token Balance
    if (parsedData.token.contract && parsedData.totalAmount) {
      let tokenBalanceBN = await parsedData.token.contract["balanceOf"](
        ...[web3Context.address]
      );

      if (values.totalAmount <= 0 || !_.isFinite(values.totalAmount)) {
        errors.recipients = "Unable to parse the text. Please try again.";
      } else if (
        tokenBalanceBN.lt(
          ethers.utils.parseUnits(
            _.toString(values.totalAmount),
            parsedData.token.decimals.toNumber()
          )
        )
      ) {
        errors.recipients = "Your token balance is too low";
      }
    }

    return errors;
  };

  async function handleApproval(cb) {
    const totalAmountBN = ethers.utils.parseUnits(
      _.toString(parsedData.totalAmount),
      parsedData.token.decimals
    );
    const tx = Transactor(web3Context.provider, cb, gasPrice);
    tx(
      parsedData.token.contract["approve"](
        paymagicData.contracts.disperse.address,
        totalAmountBN
      )
    );
  }

  async function handleSubmit(cb) {
    const tx = Transactor(web3Context.provider, cb, gasPrice);
    tx(
      contracts["disperse"]["disperseTokenSimple"](
        parsedData.token.address,
        parsedData.addressArray,
        parsedData.amountArray
      )
    );
  }

  return (
    <>
      <Head>
        <title>Paymagic | Disperse </title>
        <meta name="description" content="Fill in" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Sidebar>
        {chainId !== 137 ? <ConnectionAlert /> : null}{" "}
        <Flex justifyContent="center" flexWrap="wrap">
          <Box
            // role={"group"}
            p={6}
            m="5"
            maxW={"430px"}
            minW={"530px"}
            w={"full"}
            bg={"white"}
            boxShadow={"2xl"}
            rounded={"lg"}
            pos={"relative"}
            zIndex={1}
          >
            <AddressesContext.Provider value={providerAddresses}>
              {/* <AddressesContext.Provider value={providerAddresses}> */}
              <Text fontSize="6xl" align="center" fontWeight={500}>
                Disperse
              </Text>{" "}
              <Divider my={5} />
              <Text fontSize={"2xl"}>Send to many recipients</Text>
              <Text color={"gray.500"}>
                Input any token address and then batch transfer tokens to many
                different recipients in a single tx.
              </Text>
              <Progress hasStripe value={15} />
              {!isAddress(tokenAddress) && tokenAddress.length ? (
                <Alert status="error">
                  <AlertIcon />
                  Double check your inputted address!
                </Alert>
              ) : null}
              <FormControl id="tokenAddress" isRequired>
                <FormLabel>Token Address</FormLabel>
                <Input
                  type="text"
                  placeholder="0xa0b8...eb48"
                  value={tokenAddress}
                  onChange={(e) => {
                    setTokenAddress(String(e.target.value));
                  }}
                />
                {console.log(tokenAddress)}
              </FormControl>
              {console.log(parsedData)}
              <FormControl id="recipients" isRequired>
                <FormLabel>Recipients</FormLabel>
                <Textarea
                  rows={5}
                  placeholder="0xABCDFA1DC112917c781942Cc01c68521c415e, 1
0x00192Fb10dF37c9FB26829eb2CC623cd1BF599E8, 2
0x5a0b54d5dc17e0aadc383d2db43b0a0d3e029c4c, 3
0xEA674fdDe714fd979de3EdF0F56AA9716B898ec8, 4
..."
                />
                <FormHelperText>
                  Add one wallet address and amount per row, comma separated{" "}
                </FormHelperText>
              </FormControl>
              <Text>Confirmation details</Text>
              <Button type="submit" colorScheme="blue">
                Approve
              </Button>
              {/* </AddressesContext.Provider> */}
            </AddressesContext.Provider>
          </Box>
        </Flex>
        <Footer />
      </Sidebar>
    </>
  );
}

export default DispersePage;
