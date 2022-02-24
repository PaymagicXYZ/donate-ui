import React, { useMemo } from "react";
import {
  Box,
  Container,
  Heading,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Text,
  Link,
} from "@chakra-ui/react";

import { WalletChecker } from "../WalletChecker";

import { ListContent } from "./ListContent";
import { ChartContent } from "./ChartContent";
import { HistoryChart } from "./HistoryChart";

export default function HoldingsList(props) {
  const covalentData = props.covalentData;
  const account = props.account;
  return (
    <Box>
      <Box as="section">
        <Box>
          <Box>
            <WalletChecker loading={covalentData.loading} account={account}>
              {covalentData.loading ? (
                <Text>Loading...</Text>
              ) : covalentData.history && covalentData.balance ? (
                <Box alignItems="center" padding="10">
                  <HistoryChart covalentData={covalentData} />
                  <Tabs>
                    <TabList>
                      <Text>
                        <Link
                          href="https://zapper.fi/"
                          color="teal.500"
                          isExternal
                        >
                          View on Zapper
                        </Link>
                        &nbsp;&nbsp;|&nbsp;&nbsp;
                        <Link
                          href="https://zerion.io/"
                          color="teal.500"
                          isExternal
                        >
                          View on Zerion
                        </Link>
                      </Text>
                      <Tab>Table</Tab>
                      <Tab>Charts</Tab>
                    </TabList>

                    <TabPanels>
                      <TabPanel>
                        <ListContent
                          walletData={covalentData.balance.data.items}
                        />
                      </TabPanel>
                      <TabPanel>
                        <ChartContent
                          walletData={covalentData.balance.data.items}
                        />
                      </TabPanel>
                    </TabPanels>
                  </Tabs>
                </Box>
              ) : (
                setTimeout(() => {
                  <Text>Unable to find any data for your wallet.</Text>;
                }, 2000)
              )}
            </WalletChecker>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
