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
  useTokenList,
  useTokenContract,
  useTotalFundsRaised,
} from "../../hooks";
import { shortenAddress } from "../../utils";
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
} from "@chakra-ui/react";
import TokenList from "../TokenList";
import Badge from "../Badge";
import Button from "../Button";
import DonationDetailText from "../DonationDetailText";
import TransactionModal from "../TransactionModal";
import { BLOCK_EXPLORERS, TRANSACTION_STATUS } from "../../utils/constants";
import { useTokenPrice } from "../../hooks";

export default function Page({ causeData }: { causeData: Cause }) {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [amount, setAmount] = useState("");
  const [tokenId, setTokenId] = useState<number | null>(null);
  const tokens = useTokenList();
  const toast = useToast();
  const { chainId } = useEthers();
  const { network } = useNetwork();
  const totalFundsRaised = useTotalFundsRaised(causeData?.donation_address);

  const isSendingLocalCurrency = tokenId === 0;
  const selectedToken = tokens[tokenId];
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
  if (isSendingLocalCurrency) {
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
  }, [transactionState]);

  useEffect(() => {
    setTokenId(null);
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
    if (isSendingLocalCurrency) sendLocalCurrency();
    else transferERC20();
  };

  const handleChangeAmount = ({ target: { value } }) => {
    if (!isNaN(+value)) setAmount(value);
    if (value === "") setAmount(value);
  };

  const balance = selectedToken?.balance;
  const formattedBalance = Number.isInteger(balance)
    ? balance
    : balance?.toFixed(5);
  const insufficientBalance = balance < Number(amount);
  const donateBtnDisabled = tokenId === null || !amount;

  const hasMaxBtn = balance?.toString() !== amount && !isSendingLocalCurrency;
  const setMaxAmount = () => {
    if (hasMaxBtn) setAmount(balance.toString());
  };
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
      <TokenList selectedToken={selectedToken} onSelect={setTokenId} />
      <InputGroup justifyContent="center" alignContent="center">
        <Input
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
          _disabled={{
            bg: "input.inactive",
            opacity: 0.4,
          }}
          _hover={{
            bg: "input.hover",
          }}
        />
        <InputRightElement w="fit-content" my="16px" mx="14px">
          <Text fontSize="small" opacity={0.4} color="text">
            {amount && formatedDollarValue} - USD
          </Text>
        </InputRightElement>
      </InputGroup>
      <HStack w="full" opacity={selectedToken ? 1 : 0.5}>
        <Text color="text" fontSize="sm" opacity={0.4}>
          Available: {formattedBalance ?? "-"}
        </Text>
        <Spacer />
        {[10, 25, 50, 100].map((percent) => (
          <Badge
            key={percent}
            disabled={false}
            onClick={getPercentAmountHandler(percent)}
          >
            <Text fontSize="small">
              {percent === 100 ? "MAX" : `${percent}%`}
            </Text>
          </Badge>
        ))}
      </HStack>
      <Box py="20px" w="full">
        <Divider opacity={0.1} />
      </Box>

      <Button onClick={sendDonation} w="full" isDisabled={donateBtnDisabled}>
        {transactionState.status === TRANSACTION_STATUS.pending
          ? "Please Sign"
          : "Donate"}
      </Button>

      <VStack w="full" py="40px">
        <HStack w="full">
          <DonationDetailText opacity={0.5} color="text">
            Donation wallet
          </DonationDetailText>
          <Spacer />
          <Text fontWeight={700} opacity={0.9} color="text">
            <Link
              isExternal
              href={`${blockExplorerLink}/address/${causeData?.donation_address}`}
            >
              {shortenAddress(causeData?.donation_address || "")}
            </Link>
          </Text>
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
