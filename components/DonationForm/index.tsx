import { useEffect, useState } from "react";
import { useEthers, useContractFunction } from "@usedapp/core";
import { useTokenList, useCovalent, useTokenContract } from "../../hooks";
import { utils } from "ethers";
import {
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

const TEST_DONATION_ADDRESS = "0x7c8f8593049eE994E1fAEdf677F0F5a494545224";

export default function Page() {
  const [amount, setAmount] = useState("");
  const [tokenId, setTokenId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const { balances } = useCovalent();
  const tokens = useTokenList();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { account } = useEthers();

  const token = tokens[tokenId];
  const tokenContract = useTokenContract(token?.address);
  const { state, send: transfer } = useContractFunction(
    tokenContract,
    "transfer"
  );

  useEffect(() => {
    if (state.status === "Success") {
      setAmount("");
      setLoading(false);
    }
  }, [state]);

  const transferToken = async () => {
    setLoading(true);
    transfer(
      TEST_DONATION_ADDRESS,
      utils.parseUnits(amount, tokens[tokenId]?.decimals)
    );
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
      const { logoURI, symbol } = tokens[tokenId];
      return (
        <HStack w="full" justify="space-around" alignItems="center">
          <Image borderRadius="15px" boxSize="25px" src={logoURI} />
          <Text justifyContent="center">{symbol}</Text>
          <ChevronDownIcon fontSize="27px" />
        </HStack>
      );
    }
  };

  const getBalance = (address = "") => {
    if (balances) return balances[address.toLowerCase()] || 0;
  };
  const balance = getBalance(tokens[tokenId]?.address);
  const insufficientBalance = balance < amount;

  const submitBtnText = loading ? (
    <Spinner />
  ) : tokenId === null ? (
    "Select a token"
  ) : !amount ? (
    "Enter an amount"
  ) : insufficientBalance ? (
    `Insufficient ${token.symbol} balance`
  ) : (
    "Send"
  );
  const submitBtnDisabled = tokenId === null || !amount || loading;

  return (
    <VStack justifyContent="center">
      <CauseBanner />
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
                <Text color="gray" fontSize="sm">
                  Balance: {balance}
                </Text>
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
              href="https://rinkeby.etherscan.io/address/0x7e3BB75E8f6dA85f3049758BCE20a31Ea2dc5a0e"
            >
              Stani Kulechov
            </a>
          </Button>
        </InputContainer>
        {account ? (
          <Button
            {...btnStyles}
            onClick={transferToken}
            bg="blue.100"
            disabled={submitBtnDisabled}
          >
            {submitBtnText}
          </Button>
        ) : (
          <ConnectWallet {...btnStyles} />
        )}
        <TokenList
          isOpen={isOpen}
          onClose={onClose}
          onSelect={setTokenId}
          balances={balances}
        />
      </VStack>
    </VStack>
  );
}
