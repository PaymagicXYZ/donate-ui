import _ from 'lodash';
import {
  Text,
  Box,
  Center,
  Tabs,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  VStack,
} from "@chakra-ui/react";
import SubmitApprovalsForm from '../../components/DustSweeper/SubmitApprovalsForm'
import ApprovalTable from '../../components/DustSweeper/ApprovalTable'
import PageContainer from "../../components/PageContainer/PageContainer";
import { HeadingGroup } from "../../components/Forms/HeadingGroup";
import * as tokens from './tokens.json'

export default function Page() {
  return (
    <PageContainer>
      <Box w={['97%', '90%', '60%']} mx="auto" >
        <VStack>
          <Center>
            <HeadingGroup title="[OLD] Dust Sweeper  🧹" size="lg" />
          </Center>
          <VStack>
            <Text>🧹  Clean out small token balances in your wallet without paying gas!</Text>
            <Text>👆  Connect your wallet and approve tokens (costing $8-15 each) to get rid off.</Text>
            <Text>🤝  ETH will appear in your wallet once a bot pays gas to fill the trade.</Text>
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
              <ApprovalTable />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </PageContainer>
  );
}
