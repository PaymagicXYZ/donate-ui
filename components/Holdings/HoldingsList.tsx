import React, { useState } from "react";
import {
  Box,
  Heading,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import { useTable, usePagination } from "react-table";

import { WalletChecker } from "../WalletChecker";

import { ListContent } from "./ListContent";
import { ChartContent } from "./ChartContent";
import { useWeb3React } from "@web3-react/core";
import { useZapper } from "../../hooks/useZapper";
import { useCovalent } from "../../hooks/useCovalent";
import { ZAPPER_NETWORK, CovalentNetworkForID } from "../../utils/constants";

export default function HoldingsList(props) {
  const { library, account, chainId } = useWeb3React();
  const walletData = useZapper(
    props.accountAddress ? props.accountAddress : account,
    props.chain ? props.chain : ZAPPER_NETWORK
  );
  const covalentData = useCovalent(
    props.accountAddress ? props.accountAddress : account,
    props.chain ? CovalentNetworkForID[props.chain] : 1
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
            <Tabs>
              <TabList>
                <Tab>Holdings</Tab>
                <Tab>Charts</Tab>
              </TabList>

              <TabPanels>
                <TabPanel>
                  <ListContent walletData={walletData.assets} />
                </TabPanel>
                <TabPanel>
                  <ChartContent
                    walletData={walletData.assets}
                    historyData={covalentData.history}
                  />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </WalletChecker>
        </Box>
      </Box>
    </Box>
  );
}
