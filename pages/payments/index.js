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
  Menu,
  MenuButton,
  IconButton,
  MenuItem,
  MenuList,
  useColorModeValue as mode,
} from "@chakra-ui/react";

// import { AddressesContext } from "../../../contexts";
import { useWeb3React } from "@web3-react/core";

import PageContainer from "../../components/PageContainer/PageContainer";
import ConnectionAlert from "../../components/ConnectionAlert";
import Link from "next/link";
import SummaryCard from "../../components/SummaryCard/SummaryCard";
import { FiSend } from "react-icons/fi";
import { AiOutlinePicture, AiOutlineFork } from "react-icons/ai";
import { GiParachute } from "react-icons/gi";
import { MdOutlineCallSplit } from "react-icons/md";

import { FiChevronDown } from "react-icons/fi";
import { FaPiggyBank } from "react-icons/fa";
import { SiTelegram, SiTwitter } from "react-icons/si";
import { MdDarkMode, MdRepeat } from "react-icons/md";

function PaymentsPage() {
  const { library, account, chainId } = useWeb3React();
  const [addresses, setAddresses] = useState();
  const providerAddresses = useMemo(
    () => ({ addresses, setAddresses }),
    [addresses, setAddresses]
  );
  const paymentSummaries = [
    {
      type: "Tokens",
      title: "Batch transfer tokens",
      description: "Send tokens to many recipients all at once. Great for paying contributors, issuing dividends, or rewarding followers.",
      // more: "Great for rewarding followers or paying contributors",
      icon: FiSend,
      iconColor: "white",
      backgroundColor: "purple.500",
      href: "/payments/disperse",
    },
    {
      type: "NFT",
      title: "Batch transfer NFTs",
      description: "Send NFTs to many recipients all at once. Great for distributing tickets/badges or rewarding your community.",
      // more: "Great for rewarding followers or paying contributors",
      icon: AiOutlinePicture,
      iconColor: "white",
      backgroundColor: "pink.500",
      href: "/payments/disperseNFT",
    }
    // {
    //   type: "Airdrop",
    //   title: "Send Token Airdrop",
    //   description: "Send tokens for recipients to claim. Great for distributing tokens, issuing staking rewards, or rewarding your community.",
    //   // more: "Great for rewarding followers or paying contributors",
    //   icon: GiParachute,
    //   iconColor: "white",
    //   backgroundColor: "green.500",
    //   href: "/airdrop/send"
    // }
  ]

  // const paymentsTypes = [
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

  const PaymentMenu = () => {
    return (
      <Stack direction="column" align="end" mr="5">
        <Menu>
          <MenuButton
            as={Button}
            aria-label="Send Tokens"
            colorScheme='purple'
            rightIcon={<FiChevronDown />}
            borderRadius="xl"
            direction="rtl"
            px="3"
          >
            Send Tokens
          </MenuButton>
          <MenuList borderRadius="xl">
            <MenuItem
              as="a"
              href="https://www.paymagic.xyz"
              target="_blank"
              target="_blank"
              icon={<FiSend size="18"/>}
            >
              Pay Someone
            </MenuItem>
            <MenuItem
              as="a"
              href="https://www.paymagic.xyz"
              target="_blank"
              target="_blank"
              icon={<AiOutlineFork size="18" />}
            >
              Pay Multiple People
            </MenuItem>
            <MenuItem
              as="a"
              href="https://www.paymagic.xyz"
              icon={<MdRepeat size="18"/>}
            >
              Create Recurring Payment
            </MenuItem>
            <MenuItem
              as="a"
              href="https://www.paymagic.xyz"
              icon={<FaPiggyBank size="18"/>}
            >
              Add Funds
            </MenuItem>
            <MenuItem
              as="a"
              href="https://www.paymagic.xyz"
              icon={<GiParachute size="18"/>}
            >
              Create Airdrop
            </MenuItem>
          </MenuList>
        </Menu>
      </Stack>
    )
  }


  return (
    <PageContainer>
      <Box bg={mode('purple.50', 'purple.800')}>
        { false && 
          < PaymentMenu />   
        }       
        <SimpleGrid columns={3} spacing={5} mx={5} justifyContent="center">
          {
            paymentSummaries.map((payment, index) => {
              return (
                <SummaryCard
                  key={index}
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
