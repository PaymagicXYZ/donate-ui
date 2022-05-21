import { useEffect, useState } from "react";
import { Cause } from "../../types/cause";
import {
  useEthers,
  useContractFunction,
  useNetwork,
  useSendTransaction,
} from "@usedapp/core";
import { useTokenList, useTokenContract, useLocalCurrency } from "../../hooks";
import { utils } from "ethers";
import {
  Box,
  Text,
  VStack,
  HStack,
  Spacer,
  Input,
  Button,
  Spinner,
  Image,
  useDisclosure,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import ConnectWallet from "../ConnectWallet";
import TokenList from "../TokenList";
import InputContainer from "./InputContainer";
import CauseBanner from "./CauseBanner";

export default function Page({ causeData }: { causeData: Cause }) {
  const [amount, setAmount] = useState("");
  const [tokenId, setTokenId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const tokens = useTokenList();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { account } = useEthers();
  const localCurrency = useLocalCurrency();
  const { network } = useNetwork();

  const isSendingLocalCurrency = tokenId === -1;
  const selectedToken = isSendingLocalCurrency
    ? localCurrency
    : tokens[tokenId];
  const { sendTransaction, state: localCurrencyState } = useSendTransaction();
  const tokenContract = useTokenContract(selectedToken?.address);
  const { state: tokenState, send: transferToken } = useContractFunction(
    tokenContract,
    "transfer"
  );
  let state, send;
  if (isSendingLocalCurrency) {
    send = sendTransaction;
    state = localCurrencyState;
  } else {
    send = transferToken;
    state = tokenState;
  }

  useEffect(() => {
    if (state.status === "Success") {
      setAmount("");
      setLoading(false);
    }
  }, [state]);

  useEffect(() => {
    setTokenId(null);
  }, [network]);

  const transferERC20 = async () => {
    send(
      causeData.donation_address,
      utils.parseUnits(amount, selectedToken?.decimals)
    );
  };

  const sendLocalCurrency = async () => {
    send({ to: causeData.donation_address, value: utils.parseEther(amount) });
  };

  const sendDonation = async () => {
    setLoading(true);
    if (isSendingLocalCurrency) sendLocalCurrency();
    else transferERC20();
  };

  const handleChangeAmount = ({ target: { value } }) => {
    if (!isNaN(+value)) setAmount(value);
    if (value === "") setAmount(value);
  };

  const btnStyles = {
    w: "full",
    h: "55px",
    borderRadius: 20,
    opacity: 0.5,
  };

  const getBtnContent = () => {
    if (tokenId === null) return "Select a token";
    else {
      const { logoURI, symbol } = selectedToken;
      return (
        <HStack w="full" justify="space-around" alignItems="center">
          <Image
            alt={symbol}
            borderRadius="15px"
            boxSize="25px"
            src={logoURI}
          />
          <Text justifyContent="center">{symbol}</Text>
          <ChevronDownIcon fontSize="27px" />
        </HStack>
      );
    }
  };

  const balance = selectedToken?.balance;
  const formattedBalance = balance ? balance.toFixed(5) : balance;
  const insufficientBalance = balance < Number(amount);

  const submitBtnText = loading ? (
    <Spinner />
  ) : tokenId === null ? (
    "Select a token"
  ) : !amount ? (
    "Enter an amount"
  ) : insufficientBalance ? (
    `Insufficient ${selectedToken.symbol} balance`
  ) : (
    "Send"
  );
  const submitBtnDisabled = tokenId === null || !amount || loading;

  const hasMaxBtn = balance?.toString() !== amount && !isSendingLocalCurrency;
  const setMaxAmount = () => {
    if (hasMaxBtn) setAmount(balance.toString());
  };

  return (
    <VStack justifyContent="center">
      <CauseBanner causeData={causeData} />
      <VStack p="2" bg="gray.100" borderRadius="25px" w="full">
        <InputContainer>
          <VStack>
            <HStack>
              <Input
                onChange={handleChangeAmount}
                fontSize="2xl"
                variant="unstyled"
                placeholder="0.0"
                value={amount}
              />
              <Button
                variant="filled"
                borderRadius={15}
                bg="blue.100"
                value={tokenId}
                onClick={onOpen}
                px="30px"
              >
                {getBtnContent()}
              </Button>
            </HStack>
            {tokenId !== null && (
              <HStack w="full" justify="flex-end">
                <HStack cursor="pointer" onClick={setMaxAmount}>
                  <Text color="gray" fontSize="sm">
                    Balance: {formattedBalance}
                  </Text>
                  {hasMaxBtn && (
                    <Text
                      rounded="full"
                      px="5px"
                      py="2px"
                      backgroundColor="blue.100"
                      color="blue"
                      fontSize="xs"
                    >
                      MAX
                    </Text>
                  )}
                </HStack>
              </HStack>
            )}
          </VStack>
        </InputContainer>
        <InputContainer>
          <Text>To:</Text>
          <Spacer />
          <Button py={2} px={4} borderRadius={15} background="gray.200">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={`https://rinkeby.etherscan.io/address/${causeData?.donation_address}`}
            >
              {causeData.donation_name}
            </a>
          </Button>
        </InputContainer>
        {account ? (
          <Button
            {...btnStyles}
            onClick={sendDonation}
            bg="blue.100"
            disabled={submitBtnDisabled}
          >
            {submitBtnText}
          </Button>
        ) : (
          <ConnectWallet {...btnStyles} />
        )}
        <TokenList isOpen={isOpen} onClose={onClose} onSelect={setTokenId} />
      </VStack>
    </VStack>
  );
}
