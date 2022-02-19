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
          <Heading as="h3" size="md">
            🧹  DustSweeper DEX
          </Heading>
          <Text size='md' >
            Clean out small token balances and swap for ETH with minimal gas!
          </Text>
          <VStack mt='8'>
            <Heading as="h5" size="sm" mt='8' align='right'>
              How to use:
            </Heading>
            <OrderedList>
              <ListItem fontSize="md">✅  Approve tokens (costing $8-15 each) to swap.</ListItem>
              <ListItem fontSize="md">🤖  Bots will execute the swap and pay the gas.</ListItem>
              <ListItem fontSize="md">💰  You will receive ETH in your wallet. Done!</ListItem>
            </OrderedList>
          </VStack>
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
              <ApprovalTable toggle={true}/>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </PageContainer>
  );
}
