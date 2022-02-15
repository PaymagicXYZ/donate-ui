import { useRouter } from "next/router";
import { ethers } from "ethers";
import { useEffect, useState, useMemo } from "react";
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
  useColorModeValue as mode,
} from "@chakra-ui/react";
import SubmitApprovalsForm from '../../components/DustSweeperTables/SubmitApprovalsForm'
import ApprovalTable from '../../components/DustSweeperTables/ApprovalTable'
import PageContainer from "../../components/PageContainer/PageContainer";
import { HeadingGroup } from "../../components/Forms/HeadingGroup";
import { useWeb3React } from "@web3-react/core";
import ERC20Contract from "../../artifacts/contracts/TestERC20.sol/TestERC20.json";


export default function Page() {
  const { library, account, chainId } = useWeb3React();

  useEffect(() => {

    async function getData() {
      const erc20 = new ethers.Contract(
        `0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48`,
        ERC20Contract.abi,
        library
      );

      // event Approval(address indexed owner, address indexed spender, uint256 value);
      const filterSpender = erc20.filters.Approval(null, '0x869eC00FA1DC112917c781942Cc01c68521c415e');
      const filterOwner = erc20.filters.Approval('0x869eC00FA1DC112917c781942Cc01c68521c415e');

      const logsFrom = await erc20.queryFilter(filterOwner, -10000, "latest");

      console.log('logsFrom')
      console.log(logsFrom)
    }

    getData();

  }, []);




  return (
    <PageContainer>
      <Box w={['97%', '90%', '60%']} mx="auto" >
        <VStack>
          <Center>
            <HeadingGroup title="Dust Sweeper  🧹" size="lg" />
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
