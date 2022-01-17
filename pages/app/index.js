import Head from "next/head";
import Link from "next/link";
import { useWeb3React } from "@web3-react/core";
import {
  Alert,
  AlertIcon,
  Box,
  Container,
  Button,
  Divider,
  Flex,
  Text,
  Image,
  Stack,
  Circle,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import { BiBuoy, BiCog } from "react-icons/bi";

import { FaHandshake } from "react-icons/fa";

import { BsClockHistory } from "react-icons/bs";

import { IoWalletSharp } from "react-icons/io5";

import { IoMdContacts } from "react-icons/io";

import { RiHandCoinLine, RiSendPlaneFill } from "react-icons/ri";

import { MdAccountBalance } from "react-icons/md";
import { useRef } from "react";

import { Header } from "../../components/Header/Header";
import Footer from "../../components/Footer";

import Sidebar from "../../components/Sidebar/Sidebar";

export default function Home() {
  const { chainId } = useWeb3React();
  const focusObj = useRef();

  return (
    <>
      <Head>
        <title>Paymagic</title>
        <meta name="description" content="Content to be filled in" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#6c5be7" />
      </Head>
      <Header />
      <Sidebar>
        <Footer />
      </Sidebar>
    </>
  );
}
