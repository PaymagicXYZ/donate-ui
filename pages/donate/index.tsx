import { useEffect, useState } from "react";
import { useEthers, useContractFunction } from "@usedapp/core";
import { useTokenList, useCovalent, useTokenContract } from "../../hooks";
import { utils } from "ethers";
import {
  Text,
  VStack,
  HStack,
  Flex,
  Spacer,
  Container,
  Input,
  Button,
  Spinner,
  Image,
  useDisclosure,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import PageContainer from "../../components/PageContainer/PageContainer";
import ConnectWallet from "../../components/ConnectWallet";
import TokenList from "../../components/TokenList";
import Notifications from "../../components/Notifications";

const RoundedContainer = ({ children }) => (
  <Flex w="full" border="1px" borderRadius={25} align="center" p={5} bg="white">
    {children}
  </Flex>
);

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
    <PageContainer>
      <Container maxW="container.sm" py="100">
        <VStack
          mx="80px"
          justifyContent="center"
          bg="gray.100"
          p="2"
          borderRadius="25px"
        >
          <RoundedContainer>
            <VStack>
              <HStack>
                <Input
                  onChange={handleChangeAmount}
                  fontSize="2xl"
                  variant="unstyled"
                  placeholder="0.0"
                  value={amount}
                />
                <Spacer />
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
          </RoundedContainer>
          <RoundedContainer>
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
          </RoundedContainer>
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
      </Container>
      <Notifications />
    </PageContainer>
  );
}
