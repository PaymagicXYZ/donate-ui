import * as React from "react";
import { Box, Heading } from "@chakra-ui/react";
import { WalletChecker } from "../WalletChecker";

import { ListContent } from "./ListContent";
import { cols } from "./_data";

import { useWeb3React } from "@web3-react/core";
import { useZapper } from "../../hooks/useZapper";
import { ZAPPER_NETWORK } from "../../utils/constants";

export default function HoldingsList() {
  const { library, account, chainId } = useWeb3React();
  //   const walletData = useZapper(account, ZAPPER_NETWORK);
  const walletData = useZapper(
    "0x869ec00fa1dc112917c781942cc01c68521c415e",
    "ethereum"
  );

  return (
    <Box as="section" py={{ base: "2", md: "4" }}>
      <Box
        maxW={{ base: "xl", md: "7xl" }}
        mx="auto"
        px={{ base: "2", md: "4" }}
      >
        <Box overflowX="auto">
          <WalletChecker loading={walletData.loading} account={account}>
            <ListContent walletData={walletData} />
          </WalletChecker>
        </Box>
      </Box>
    </Box>
  );
}
