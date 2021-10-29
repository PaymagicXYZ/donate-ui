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
  Heading,
  Stack,
  Spacer,
} from "@chakra-ui/react";
import { useRef } from "react";
import { useDisclosure } from "@chakra-ui/hooks";

import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Home() {
  const { chainId } = useWeb3React();
  const focusObj = useRef();
  const {
    isOpen: isBarOpen,
    onOpen: onBarOpen,
    onClose: onBarClose,
  } = useDisclosure();

  return (
    <Box bgGradient="linear( #fbcdcf, #c471ed, #12c2e9)">
      <Head>
        <title>Paymagic</title>
        <meta name="description" content="Content to be filled in" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex p={6} flexWrap="wrap">
        <Stack direction="row" alignItems="center">
          <Image
            src="logo_512x512.png"
            alt="Balloon"
            boxSize="48px"
            objectFit="cover"
          />
          <Heading as="h1" size="lg" isTruncated>
            Paymagic
          </Heading>
        </Stack>
      </Flex>
      <Divider mb={5} />
      <Container>
        {/* <Header /> */}

        <center>
          <Text fontSize="4xl">
            <strong>A payment tool for DAOs and crypto teams.</strong>
          </Text>
        </center>
        <Divider my={5} />

        <center>{/* <Image src="montage.png" alt="Montage" /> */}</center>

        <Text fontSize="2xl" mb={1}>
          The app was inspired by the ideas and creations of projects like
          Disperse.app, SuperFluid, Sabler, MerkleDrops, and many more. 🙏
          <br />
          <br />
          🐛 Submit bugs or feature requests{" "}
          <Link href="https://airtable.com/shrpR5auT6RUIOrDC">
            <a>here.</a>
          </Link>
          <br />
          💬 To contact or contribute to the DAO, join on{" "}
          <Link href="https://t.me/paymagic">
            <a>Telegram.</a>
          </Link>
          <br />
          🪞 More details can be found on{" "}
          <Link href="https://t.me/paymagic">
            <a>Mirror.</a>
          </Link>
          <br />
          <br />
          Cheers,
          <br />✨ 💸 ✨ Paymagic Team ✨ 💸 ✨
        </Text>

        <Link href="/app">
          <a>
            <center>
              {" "}
              <Button
                colorScheme="black"
                variant="outline"
                my="5"
                pl="150"
                pr="150"
              >
                Enter app
              </Button>
            </center>
          </a>
        </Link>
      </Container>
      <Footer />
    </Box>
  );
}
