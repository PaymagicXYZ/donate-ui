import { ChakraProvider } from "@chakra-ui/react";
import Head from "next/head";
import { Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { theme } from "../styles/theme"
import ReactGA from 'react-ga';

ReactGA.initialize(' UA-44648226-14 ');

function getLibrary(provider) {
  const library = new Web3Provider(provider);
  // library.pollingInterval = 12000;
  return library;
}

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Web3ReactProvider getLibrary={getLibrary}>
        <Head>
          <title>DustSweeper</title>
          <meta name="description" content="Fill in" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Component {...pageProps} />
      </Web3ReactProvider>
    </ChakraProvider>
  );
}

export default MyApp;
