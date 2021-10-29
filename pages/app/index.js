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
} from "@chakra-ui/react";
import { useRef } from "react";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import SideBar from "../../components/Sidebar/Sidebar";

export default function Home() {
  const { chainId } = useWeb3React();
  const focusObj = useRef();

  return (
    <Box>
      <Head>
        <title>Paymagic</title>
        <meta name="description" content="Content to be filled in" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header postion />

      <Container>
        <SideBar />
        {chainId !== 137 ? (
          <Alert status="error" mb={3}>
            <AlertIcon />
            <Text>
              Please connect Metamask and use the{" "}
              <strong>Ethereum Mainnet, Polygon Mainnet, </strong>or{" "}
              <strong>Kovan Network</strong> network
            </Text>
          </Alert>
        ) : null}
        <center>
          {/* <Text fontSize="4xl">
            <strong>A payment tool for DAOs and crypto teams.</strong>
          </Text> */}
        </center>
        {/* <Divider my={5} /> */}
        {/* <Text fontSize="2xl" mb={1}>
          The app was inspired by the ideas and creations of projects like
          Disperse.app, SuperFluid, Sabler, MerkleDrops, and many more. 🙏
          <br />
          <br />
          🐛 Submit bugs or feature requests here.
          <br />
          💬 To contact or contribute to the DAO, join on Telegram.
          <br />
          🪞 More details can be found on Mirror.
          <br />
          <br />
          Cheers,
          <br />✨ 💸 ✨ Paymagic Team ✨ 💸 ✨
        </Text> */}
        {/* <Link href="/app">
          <a>
            <center>
              {" "}
              <Button colorScheme="telegram" my="5" pl="150" pr="150">
                Enter app
              </Button>
            </center>
          </a>
        </Link> */}
        <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br>{" "}
        <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br>{" "}
        <br></br> <br></br> <br></br> <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
      </Container>
      <Footer />
    </Box>
  );
}
