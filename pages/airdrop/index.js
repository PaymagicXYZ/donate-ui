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
  VStack,
  StackDivider,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import { ethers, utils } from "ethers";
import { FaHandshake } from "react-icons/fa";

import { BsClockHistory } from "react-icons/bs";

import { IoWalletSharp } from "react-icons/io5";

import { IoMdContacts } from "react-icons/io";

import { RiHandCoinLine, RiSendPlaneFill } from "react-icons/ri";

import { MdAccountBalance } from "react-icons/md";

// import { AddressesContext } from "../../../contexts";
import { useWeb3React } from "@web3-react/core";
import { BiBuoy, BiCog } from "react-icons/bi";

// import AddressList from "../../components/AddressList";
// import CampaignForm from "../../components/CampaignForm";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Sidebar from "../../components/Sidebar/Sidebar";
import ConnectionAlert from "../../components/ConnectionAlert";
import Link from "next/link";

// import { NavItem } from "../../components/NavItem";

function AirdropsPage() {
  const { library, account, chainId } = useWeb3React();
  const [addresses, setAddresses] = useState();
  const providerAddresses = useMemo(
    () => ({ addresses, setAddresses }),
    [addresses, setAddresses]
  );

  return (
    <>
      <Head>
        <title>Paymagic | Claim Airdrop </title>
        <meta name="description" content="Fill in" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Sidebar>
        <VStack
          divider={<StackDivider borderColor="gray.200" />}
          spacing={4}
          align="stretch"
        >
          <Box h="40px" bg="yellow.200">
            1
          </Box>
          <Box h="40px" bg="tomato">
            2
          </Box>
          <Box h="40px" bg="pink.100">
            3
          </Box>
        </VStack>
        <Footer />
      </Sidebar>
    </>
  );
}

export default AirdropsPage;
