import _ from "lodash";
import { useMemo, useState, useEffect } from "react";
import { useRouter } from "next/router";
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
// import { Dashboard } from "../components/Holdings/Dashboard";
import { CleanWallet } from "../components/CleanWallet/CleanWallet";
import { FAQ } from "../components/FAQ/FAQ";

import { useCovalent } from "../hooks/useCovalent";
import { useWeb3React } from "@web3-react/core";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function Page() {
  const { library, account, chainId } = useWeb3React();
  //only fetching mainnet for now
  const fetchCovalentData = useCovalent(account, 1);
  const covalentData = useMemo(() => {
    return fetchCovalentData;
  }, [fetchCovalentData]);
  const { t } = useTranslation("common");
  const { query } = useRouter();
  const [tab, setTab] = useState(0);
  useEffect(() => {
    setTab(Number(query.tab));
  }, [query]);
  const handleTabsChange = (index) => {
    setTab(index);
  };
  return (
    <PageContainer>
      {/* {console.log(tab)} */}
      <Box w={["97%", "90%", "70%"]} mx="auto">
        <VStack mt="8" mb="3">
          <Heading as="h3" size="md">
            {t("title")}
          </Heading>
          <Text size="md">{t("subtitle")}</Text>
          <VStack mt="8">
            <Heading as="h5" size="sm" mt="8">
              {t("howToUse")}
            </Heading>
            <OrderedList>
              <ListItem fontSize="md">{t("description.part1")}</ListItem>
              <ListItem fontSize="md">{t("description.part2")}</ListItem>
              <ListItem fontSize="md">{t("description.part3")}</ListItem>
            </OrderedList>
          </VStack>
        </VStack>
        <Tabs
          isLazy
          index={tab == (0 || 1 || 2) ? tab : 0}
          variant="soft-rounded"
          colorScheme="purple"
          mt="8"
          onChange={handleTabsChange}
        >
          <Center>
            <TabList>
              <Tab>{t("clean.title")}</Tab>
              <Tab>{t("order.title")}</Tab>
              <Tab>{t("faq.title")}</Tab>
              {/* <Tab>Dashboard</Tab> */}
            </TabList>
          </Center>
          <TabPanels>
            <TabPanel>
              <CleanWallet {...{ account, covalentData }} />
            </TabPanel>
            <TabPanel>
              <ApprovalTable toggle={true} {...{ account, covalentData }} />
            </TabPanel>
            <TabPanel>
              <FAQ />
            </TabPanel>
            {/* <TabPanel>
              <Dashboard {...{ account, covalentData }} />
            </TabPanel> */}
          </TabPanels>
        </Tabs>
        {false && <ModalWarning />}
      </Box>
    </PageContainer>
  );
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});
