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
  useLocalCurrency,
  usePastDonations,
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
  Spinner,
  Image,
  Divider,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import TokenList from "../TokenList";
import Badge from "../Badge";
import Button from "../Button";
import DonationDetailText from "../DonationDetailText";
import { BLOCK_EXPLORERS } from "../../utils/constants";

export default function Page({ causeData }: { causeData: Cause }) {
  const [amount, setAmount] = useState("");
  const [tokenId, setTokenId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const tokens = useTokenList();
  const { chainId, account } = useEthers();
  const localCurrency = useLocalCurrency();
  const { network } = useNetwork();
  const totalFundsRaised = useTotalFundsRaised(causeData?.donation_address);

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
  const formattedBalance = Number.isInteger(balance)
    ? balance
    : balance?.toFixed(5);
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
  const donateBtnDisabled = tokenId === null || !amount || loading;

  const hasMaxBtn = balance?.toString() !== amount && !isSendingLocalCurrency;
  const setMaxAmount = () => {
    if (hasMaxBtn) setAmount(balance.toString());
  };
  const getPercentAmountHandler = (percent: number) => () => {
    const newAmount = balance * (percent / 100);
    setAmount(newAmount.toString());
  };
  const dollarValue = (selectedToken?.price * +amount).toFixed(2) || "";
  const formatedTotalFundsRaised = totalFundsRaised.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
  const blockExplorerLink = BLOCK_EXPLORERS[chainId];

  return (
    <VStack w="full">
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
            {amount && dollarValue} - USD
          </Text>
        </InputRightElement>
      </InputGroup>
      <HStack w="full" opacity={selectedToken ? 1 : 0.5}>
        <Text color="text" fontSize="sm" opacity={0.4}>
          Available: {formattedBalance}
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
      <HStack
        w="full"
        paddingBottom="12px"
        opacity={donateBtnDisabled ? 0.5 : 1}
      >
        <Text opacity={0.5} color="text">
          Network
        </Text>
        <Spacer />
        <Text opacity={0.9} color="networkSpeed.fast" fontWeight={700}>
          Fast
        </Text>
      </HStack>

      <Button onClick={sendDonation} w="full" isDisabled={donateBtnDisabled}>
        Donate
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
    // <VStack>
    //   <VStack>
    //     <Input
    //       onChange={handleChangeAmount}
    //       fontSize="2xl"
    //       variant="unstyled"
    //       placeholder="0.0"
    //       value={amount}
    //     />
    //     <Button
    //       variant="filled"
    //       borderRadius={15}
    //       bg="blue.100"
    //       value={tokenId}
    //       onClick={onOpen}
    //       px="30px"
    //     >
    //       {getBtnContent()}
    //     </Button>
    //     {tokenId !== null && (
    //       <HStack w="full" justify="flex-end">
    //         <HStack cursor="pointer" onClick={setMaxAmount}>
    //           <Text color="gray" fontSize="sm">
    //             Balance: {formattedBalance}
    //           </Text>
    //           {hasMaxBtn && (
    //             <Text
    //               rounded="full"
    //               px="5px"
    //               py="2px"
    //               backgroundColor="blue.100"
    //               color="blue"
    //               fontSize="xs"
    //             >
    //               MAX
    //             </Text>
    //           )}
    //         </HStack>
    //       </HStack>
    //     )}
    //   </VStack>
    //   <InputContainer>
    //       <Text>To:</Text>
    //       <Spacer />
    //       <Button py={2} px={4} borderRadius={15} background="gray.200">
    //         <a
    //           target="_blank"
    //           rel="noopener noreferrer"
    //           href={`https://rinkeby.etherscan.io/address/${causeData?.donation_address}`}
    //         >
    //           {causeData?.donation_name}
    //         </a>
    //       </Button>
    //     </InputContainer>
    //     {account ? (
    //       <Button
    //         {...btnStyles}
    //         onClick={sendDonation}
    //         bg="blue.100"
    //         disabled={submitBtnDisabled}
    //       >
    //         {submitBtnText}
    //       </Button>
    //     ) : (
    //       <ConnectWallet {...btnStyles} />
    //     )}
    //   <TokenList isOpen={isOpen} onClose={onClose} onSelect={setTokenId} />
    // </VStack>
  );
}
