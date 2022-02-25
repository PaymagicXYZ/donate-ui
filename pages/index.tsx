import _ from "lodash";
import { useMemo } from "react";
import {
  Heading,
  Text,
  Box,
  Center,
  Tabs,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  VStack,
  OrderedList,
  ListItem,
  Link,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import ApprovalTable from "../components/Opportunities/ApprovalTable";
import PageContainer from "../components/PageContainer/PageContainer";
// import { HeadingGroup } from "../components/Forms/HeadingGroup";
import ModalWarning from "../components/ModalWarning";
import { Dashboard } from "../components/Holdings/Dashboard";
import { CleanWallet } from "../components/CleanWallet/CleanWallet";

import { useCovalent } from "../hooks/useCovalent";
import { useWeb3React } from "@web3-react/core";

export default function Page() {
  const { library, account, chainId } = useWeb3React();
  //only fetching mainnet for now
  const fetchCovalentData = useCovalent(account, 1);
  const covalentData = useMemo(() => {
    return fetchCovalentData;
  }, [fetchCovalentData]);

  return (
    <PageContainer>
      <Box w={["97%", "90%", "70%"]} mx="auto">
        <VStack mt="8" mb="3">
          <Heading as="h3" size="md">
            🧹 DustSweeper DEX
          </Heading>
          <Text size="md">
            Clean out small token balances and swap for ETH with minimal gas!
          </Text>
          <VStack mt="8">
            <Heading as="h5" size="sm" mt="8">
              How to use:
            </Heading>
            <OrderedList>
              <ListItem fontSize="md">
                ⛽ Approve tokens to swap costing ~$10 each.
              </ListItem>
              <ListItem fontSize="md">
                🤖 Bots swap the tokens for ETH at a discount and pay the gas.
              </ListItem>
              <ListItem fontSize="md">
                💰 You receive ETH in your wallet once done, usually within
                24hrs.
              </ListItem>
            </OrderedList>
          </VStack>
        </VStack>
        <Tabs variant="soft-rounded" colorScheme="purple" mt="8">
          <Center>
            <TabList>
              <Tab>Clean Wallet</Tab>
              <Tab>View Opportunities</Tab>
              <Tab>Dashboard</Tab>
            </TabList>
          </Center>
          <TabPanels>
            <TabPanel>
              <CleanWallet {...{ account, covalentData }} />
            </TabPanel>
            <TabPanel>
              <ApprovalTable toggle={true} />
            </TabPanel>
            <TabPanel>
              <Dashboard {...{ account, covalentData }} />
            </TabPanel>
          </TabPanels>
        </Tabs>
        {false && <ModalWarning />}
      </Box>
    </PageContainer>
  );
}
