import * as React from "react";
import {
  Box,
  Heading,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import { WalletChecker } from "../WalletChecker";

import { ListContent } from "./ListContent";
import { ChartContent } from "./ChartContent";
import { useWeb3React } from "@web3-react/core";
import { useZapper } from "../../hooks/useZapper";
import { ZAPPER_NETWORK } from "../../utils/constants";

export default function HoldingsList() {
  const { library, account, chainId } = useWeb3React();
  const walletData = useZapper(account, ZAPPER_NETWORK);

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
                  <ListContent walletData={walletData} />
                </TabPanel>
                <TabPanel>
                  <ChartContent walletData={walletData} />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </WalletChecker>
        </Box>
      </Box>
    </Box>
  );
}
