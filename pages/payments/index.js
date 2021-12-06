import { useMemo, useState } from "react";
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
  Circle,
  Alert,
  AlertIcon,
  useToast,
  Spacer,
  Divider,
  SimpleGrid,
  useColorModeValue as mode,
} from "@chakra-ui/react";

// import { AddressesContext } from "../../../contexts";
import { useWeb3React } from "@web3-react/core";

import PageContainer from "../../components/PageContainer/PageContainer";
import ConnectionAlert from "../../components/ConnectionAlert";
import Link from "next/link";
import { App } from "../../components/SummaryCard/App";
import SummaryCard from "../../components/SummaryCard/SummaryCard";
import { FiSend } from "react-icons/fi";
import { AiOutlinePicture } from "react-icons/ai";
import { GiParachute } from "react-icons/gi";
import { MdOutlineCallSplit } from "react-icons/md";

// import { NavItem } from "../../components/NavItem";

function PaymentsPage() {
  const { library, account, chainId } = useWeb3React();
  const [addresses, setAddresses] = useState();
  const providerAddresses = useMemo(
    () => ({ addresses, setAddresses }),
    [addresses, setAddresses]
  );
  const paymentSummaries = [
    {
      type: "Disperse",
      title: "Batch token transfer",
      description: "Send tokens to many recipients all at once. Great for paying contributors or rewarding followers.",
      // more: "Great for rewarding followers or paying contributors",
      icon: FiSend,
      iconColor: "white",
      backgroundColor: "purple.500",
      href: "/payments/disperse",
    },
    {
      type: "Disperse",
      title: "Batch NFT transfer",
      description: "Send NFTs to many recipients all at once, no need to claim. Great for rewarding your community.",
      // more: "Great for rewarding followers or paying contributors",
      icon: AiOutlinePicture,
      iconColor: "white",
      backgroundColor: "pink.500",
      href: "/payments/disperseNFT",
    }
    // {
    //   type: "Airdrop Tokens",
    //   title: "Send Token Airdrop",
    //   description: "Send tokens for recipients to claim. Great for issuing staking rewards, sending yield to liquidity providers, or rewarding your community.",
    //   // more: "Great for rewarding followers or paying contributors",
    //   icon: GiParachute,
    //   iconColor: "white",
    //   backgroundColor: "green.500",
    //   href: "/airdrop/send"
    // }
    // {
    //   type: "Clique Tip",
    //   title: "Tip popular fams for fun and profit",
    //   description: "",
    //   // more: "Great for rewarding followers or paying contributors",
    //   icon: MdOutlineCallSplit,
    //   iconColor: "white",
    //   backgroundColor: "blue.500",
    //   href: "/airdrop/send",
    // }
  ]

  // const paymentsTypes = [
    // {
    //   title: "Vesting",
    //   image: "vesting-payment.png",
    //   imageAlt: "vesting",
    //   description: "Create a token vesting schedule for a recipient",
    //   more: "Great for distributing tokens over time to your team or investors",
    // },
    // {
    //   title: "Stream",
    //   image: "stream-payment.png",
    //   imageAlt: "stream",
    //   description: "Send tokens continuously by the second",
    //   more: "Create real-time subscriptions, salaries, or vesting",
    // },
    // {
    //   title: "Escrow",
    //   image: "escrow-payment.png",
    //   imageAlt: "escrow",
    //   description: "Collect yield in an escrow account until redemption",
    //   more: "Partnerships, security deposites, & pools",
    // },
    // {
    //   title: "Private payment",
    //   image: "private-payment.png",
    //   imageAlt: "private",
    //   description: "Send tokens secretly",
    //   more: "Use for private transactions or avoiding censorship",
    // },
  // ];

  return (
    <PageContainer>
      <Box bg={mode('purple.50', 'purple.800')} py="10">
        <SimpleGrid minChildWidth='210px' spacing={5} mx={5} justifyContent="center">
          {
            paymentSummaries.map((payment, index) => {
              return (
                <SummaryCard
                  { ...payment }
                />
              )
            })
          }
        </SimpleGrid>
      </Box>
    </PageContainer>
  );
}

export default PaymentsPage;
