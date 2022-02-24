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
// import { Zerion } from "./Zerion";
import { useWeb3React } from "@web3-react/core";
// import { useZapper } from "../../hooks/useZapper";
import { useCovalent } from "../../hooks/useCovalent";
// import { useZerion } from "../../hooks/useZerion";
import { ZAPPER_NETWORK, CovalentNetworkForID } from "../../utils/constants";

export default function HoldingsList(props) {
  const { library, account, chainId } = useWeb3React();
  // const fetchWalletData = useZapper(
  //   props.accountAddress ? props.accountAddress : account,
  //   props.chain ? props.chain : ZAPPER_NETWORK
  // );
  const fetchCovalentData = useCovalent(
    props.accountAddress ? props.accountAddress : account,
    props.chain ? CovalentNetworkForID[props.chain] : 1
  );

  const covalentData = useMemo(() => {
    return fetchCovalentData;
  }, [fetchCovalentData]);
  // const walletData = useMemo(() => {
  //   return fetchWalletData;
  // }, [fetchWalletData]);

  // const portfolio = useZerion(
  //   props.accountAddress ? props.accountAddress : account
  // );
  // const portfolio = useMemo(() => fetchPortfolio, [fetchPortfolio]);

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
                      {/* <Tab>Zerion</Tab> */}
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
                      {/* <TabPanel>
                        <Zerion portfolio={portfolio} />
                      </TabPanel> */}
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
