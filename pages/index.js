import _ from 'lodash';
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
  HStack,
  Stack,
  OrderedList,
  ListItem,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import SubmitApprovalsForm from '../components/DustSweeper/SubmitApprovalsForm'
import ApprovalTable from '../components/DustSweeper/ApprovalTable'
import PageContainer from "../components/PageContainer/PageContainer";
import { HeadingGroup } from "../components/Forms/HeadingGroup";

export default function Page() {
  return (
    <PageContainer>
      <Box w={['97%', '90%', '70%']} mx="auto" >
        <VStack mt="8" mb="3">
          <Heading as="h5" size="md">
            🧹  Clean out small token balances and swap for ETH!
          </Heading>
          <Center>
            <OrderedList>
              <ListItem fontSize="md">✅  Approve tokens (costing $8-15 each) to swap.</ListItem>
              <ListItem fontSize="md">🤖  Bots will execute the swap and pay gas.</ListItem>
              <ListItem fontSize="md">💰  You'll receive ETH in your wallet. Done!</ListItem>
            </OrderedList>
          </Center>
        </VStack>
        <Tabs variant='soft-rounded' colorScheme='purple' mt="8">
          <Center>
            <TabList>
              <Tab>Clean Wallet</Tab>
              <Tab>View Opportunities</Tab>
            </TabList>
            </Center>
          <TabPanels>
            <TabPanel>
              <SubmitApprovalsForm />
            </TabPanel>
            <TabPanel>
              <ApprovalTable />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </PageContainer>
  );
}
