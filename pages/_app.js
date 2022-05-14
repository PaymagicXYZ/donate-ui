import { ChakraProvider } from "@chakra-ui/react";

import Head from "next/head";
import { theme } from "../styles/theme";
import Script from "next/script";
import { appWithTranslation } from "next-i18next";

import { Mainnet, DAppProvider } from "@usedapp/core";
import { getDefaultProvider } from "ethers";

const config = {
  readOnlyChainId: Mainnet.chainId,
  readOnlyUrls: {
    [Mainnet.chainId]: getDefaultProvider("mainnet"),
  },
};

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <DAppProvider config={{}}>
        <Head>
          <title>Ethereum Supports Me</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
            (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
            m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
            })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

            ga('create', 'UA-44648226-14', 'auto');
            ga('send', 'pageview');
          `}
        </Script>

        <Component {...pageProps} />
      </DAppProvider>
    </ChakraProvider>
  );
}

export default appWithTranslation(MyApp);
