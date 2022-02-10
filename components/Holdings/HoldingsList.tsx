import React, { useMemo } from "react";
import {
  Box,
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
import { useZapper } from "../../hooks/useZapper";
import { useCovalent } from "../../hooks/useCovalent";
// import { useZerion } from "../../hooks/useZerion";
import { ZAPPER_NETWORK, CovalentNetworkForID } from "../../utils/constants";

export default function HoldingsList(props) {
  const { library, account, chainId } = useWeb3React();
  const fetchWalletData = useZapper(
    props.accountAddress ? props.accountAddress : account,
    props.chain ? props.chain : ZAPPER_NETWORK
  );
  const fetchCovalentData = useCovalent(
    props.accountAddress ? props.accountAddress : account,
    props.chain ? CovalentNetworkForID[props.chain] : 1
  );
  const covalentData = useMemo(() => {
    return fetchCovalentData;
  }, [fetchCovalentData]);
  const walletData = useMemo(() => {
    return fetchWalletData;
  }, [fetchWalletData]);

  // const portfolio = useZerion(
  //   props.accountAddress ? props.accountAddress : account
  // );

  return (
    <Box as="section" py={{ base: "2", md: "4" }}>
      <Box
        maxW={{ base: "xl", md: "7xl" }}
        mx="auto"
        px={{ base: "2", md: "4" }}
      >
        <Box overflowX="auto">
          <WalletChecker
            loading={walletData.loading && covalentData.loading}
            account={account}
          >
            {walletData.loading && covalentData.loading ? (
              <Text>Loading...</Text>
            ) : covalentData.history && walletData.assets ? (
              <>
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
                      <ListContent walletData={walletData.assets} />
                    </TabPanel>
                    <TabPanel>
                      <ChartContent walletData={walletData.assets} />
                    </TabPanel>
                    {/* <TabPanel>
                      <Zerion portfolio={portfolio} />
                    </TabPanel> */}
                  </TabPanels>
                </Tabs>
              </>
            ) : (
              setTimeout(() => {
                <Text>Unable to find any data for your wallet.</Text>;
              }, 2000)
            )}
          </WalletChecker>
        </Box>
      </Box>
    </Box>
  );
}
