import { useEffect, useState } from "react";
import { Cause } from "../../types/cause";
import NetworkSwitch from "../NetworkSwitch";
import {
  useEthers,
  useContractFunction,
  useNetwork,
  useSendTransaction,
} from "@usedapp/core";
import {
  useTokenContract,
  useTotalFundsRaised,
  UserTokenData,
} from "../../hooks";
import { formatAmount, shortenAddress } from "../../utils";
import { utils } from "ethers";
import {
  Link,
  Input,
  Box,
  InputGroup,
  InputRightElement,
  Text,
  VStack,
  HStack,
  Spacer,
  Divider,
  useDisclosure,
  useToast,
  FormControl,
  FormHelperText,
} from "@chakra-ui/react";
import TokenList from "../TokenList";
import Badge from "../Badge";
import Button from "../Button";
import DonationDetailText from "../DonationDetailText";
import TransactionModal from "../TransactionModal";
import Address from "../Address";
import {
  BLOCK_EXPLORERS,
  TRANSACTION_STATUS,
  NATIVE_CURRENCIES,
} from "../../utils/constants";
import { useTokenPrice } from "../../hooks";

export default function Page({
  causeData,
  setDonationMade,
}: {
  causeData: Cause;
  setDonationMade: (wasMade: boolean) => void;
}) {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [amount, setAmount] = useState("");
  const [selectedToken, setSelectedToken] = useState<UserTokenData>();
  const toast = useToast();
  const { chainId } = useEthers();
  const { network } = useNetwork();
  const totalFundsRaised = useTotalFundsRaised(causeData?.donation_address);

  const isSendingNativeCurrency = NATIVE_CURRENCIES.includes(
    selectedToken?.symbol
  );
  const {
    sendTransaction,
    state: localCurrencyState,
    resetState,
  } = useSendTransaction();
  const tokenContract = useTokenContract(selectedToken?.address);
  const { state: tokenState, send: transferToken } = useContractFunction(
    tokenContract,
    "transfer"
  );
  let transactionState;
  if (isSendingNativeCurrency) {
    transactionState = localCurrencyState;
  } else {
    transactionState = tokenState;
  }

  const onCloseTransactionModal = () => {
    setAmount("");
    onClose();
  };

  useEffect(() => {
    if (transactionState.status === TRANSACTION_STATUS.exception) {
      onClose();
      toast({
        title: "Transaction Cancelled",
        description: transactionState.errorMessage,
        status: "error",
        position: "bottom-right",
      });
      resetState();
    }
    if (transactionState.status === TRANSACTION_STATUS.success) {
      setDonationMade(true);
      resetState();
    }
  }, [transactionState]);

  useEffect(() => {
    setSelectedToken(null);
    setAmount("");
  }, [network]);

  const transferERC20 = async () => {
    transferToken(
      causeData.donation_address,
      utils.parseUnits(amount, selectedToken?.decimals)
    );
  };

  const sendLocalCurrency = async () => {
    sendTransaction({
      to: causeData.donation_address,
      value: utils.parseEther(amount),
    });
  };

  const sendDonation = async () => {
    onOpen();
    if (isSendingNativeCurrency) sendLocalCurrency();
    else transferERC20();
  };

  const handleChangeAmount = ({ target: { value } }) => {
    if (!isNaN(+value)) setAmount(value);
    if (value === "") setAmount(value);
  };

  const balance = selectedToken?.balance;
  const formattedBalance = formatAmount(balance);

  // Number.isInteger(balance)
  //   ? balance
  //   : balance?.toFixed(5);
  const insufficientBalance = balance < Number(amount);
  const donateBtnDisabled = !selectedToken || !amount || insufficientBalance;

  const getPercentAmountHandler = (percent: number) => () => {
    const newAmount = balance * (percent / 100);
    setAmount(newAmount.toString());
  };

  const spotPrice = useTokenPrice(selectedToken?.symbol);
  const dollarValue = spotPrice * +amount || "";
  const formatedDollarValue = dollarValue
    ? dollarValue.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    : dollarValue;

  const formatedTotalFundsRaised = totalFundsRaised.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
  const blockExplorerLink = BLOCK_EXPLORERS[chainId];

  return (
    <VStack direction="column" w="full">
      <TransactionModal
        transactionState={transactionState}
        isOpen={isOpen}
        onClose={onCloseTransactionModal}
        tokenSymbol={selectedToken?.symbol}
        amountToDonate={amount}
      />
      <NetworkSwitch />
      <TokenList selectedToken={selectedToken} onSelect={setSelectedToken} />
      <FormControl isInvalid={insufficientBalance}>
        <InputGroup justifyContent="center" alignContent="center">
          <Input
            _focus={{
              boxShadow: "none",
            }}
            errorBorderColor="error"
            my="8px"
            bg="input.active"
            border="0"
            value={amount}
            isDisabled={!selectedToken}
            onChange={handleChangeAmount}
            h="input"
            color="text"
            opacity={0.9}
            placeholder="Amount"
            _placeholder={{
              color: "text",
              opacity: 0.6,
            }}
            _disabled={{
              bg: "input.inactive",
              opacity: 0.4,
            }}
            _hover={{
              bg: "input.hover",
            }}
          />
          <InputRightElement w="fit-content" my="16px" mx="14px">
            <Text fontSize="small" opacity={0.4} color="text" lineHeight="16px">
              {amount && formatedDollarValue} - USD
            </Text>
          </InputRightElement>
        </InputGroup>
        {insufficientBalance && (
          <FormHelperText
            marginTop="0px"
            fontWeight={700}
            fontSize="pastDonation"
            color="error"
          >
            Amount entered is greater than wallet balance.
          </FormHelperText>
        )}
      </FormControl>
      <HStack w="full" opacity={selectedToken ? 1 : 0.5}>
        <Text color="text" fontSize="sm" opacity={0.4}>
          Available: {formattedBalance ?? "-"}
        </Text>
        <Spacer />
        {[10, 25, 50, 100].map((percent) => (
          <Badge
            key={percent}
            disabled={!selectedToken}
            onClick={getPercentAmountHandler(percent)}
          >
            <Text fontSize="small" color="text">
              {percent === 100 ? "MAX" : `${percent}%`}
            </Text>
          </Badge>
        ))}
      </HStack>
      <Box py="20px" w="full">
        <Divider bg="divider" opacity={0.4} />
      </Box>

      <Button
        fontWeight={600}
        onClick={sendDonation}
        w="full"
        isDisabled={donateBtnDisabled}
      >
        Donate
      </Button>

      <VStack w="full" py="20px">
        <HStack w="full">
          <DonationDetailText opacity={0.5} color="text">
            Donation wallet
          </DonationDetailText>
          <Spacer />
          <Address address={causeData?.donation_address} />
        </HStack>
        <HStack w="full">
          <DonationDetailText opacity={0.5} color="text">
            Total funds (USD)
          </DonationDetailText>
          <Spacer />
          <Text fontWeight={700} opacity={0.9} color="text">
            {formatedTotalFundsRaised}
          </Text>
        </HStack>
        <HStack w="full">
          <DonationDetailText opacity={0.5} color="text">
            Created by
          </DonationDetailText>
          <Spacer />
          <Text fontWeight={700} opacity={0.9} color="text">
            websurfer.eth
          </Text>
        </HStack>
      </VStack>
    </VStack>
  );
}
