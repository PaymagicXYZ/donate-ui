import { useRouter } from "next/router";
import { ethers } from "ethers";
import _ from 'lodash';
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
import * as allTokens from './allTokens.json'
import * as tokens from './tokens.json'

export default function Page() {
  const { library, account, chainId } = useWeb3React();

  useEffect(() => {
    const tokenSymbols = ['1INCH','AAVE','ALCX','ALPHA','AMPL','ANKR','ANT','AXS','BADGER','BAL','BAND','BAT','BETA','BNB','BNT','BOND','BTC','BUSD','CEL','COMP','CREAM','CRO','CRV','CTSI','DAI','DATA','DNT','DPI','ENJ','FARM','FEI','FIL','FTM','FTT','GHST','GNO','GRT','GTC','GUSD','HEGIC','HUSD','ILV','KNC','KP3R','LDO','LINK','LON','LRC','LUNA','MANA','MKR','MLN','NMR','NU','OCEAN','OGN','OHMv1','OHMv2','OMG','ORN','PAX','PAXG','PERP','RAI','RARI','REN','REP','RLC','RUNE','SHIB','SLP','SNX','SRM','STAKE','SUSD','SUSHI','TRIBE','TUSD','UMA','UNI','USDC','USDT','UST','VGX','WNXM','WOO','XSUSHI','YFI','YFII','YGG','ZRX']
    const tokens = _.filter(allTokens.tokens, function(o) { return _.includes(tokenSymbols, o.symbol); });

    console.log(tokens)




    async function getData() {
      const erc20 = new ethers.Contract(
        `0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48`,
        ERC20Contract.abi,
        library.getSigner(account)
      );

      // event Approval(address indexed owner, address indexed spender, uint256 value);
      const filterSpender = erc20.filters.Approval(null, '0x869eC00FA1DC112917c781942Cc01c68521c415e');
      const filterOwner = erc20.filters.Approval('0xb93a5a1ecc19974a139b8b939be277cb48ad8332');

      const logsFrom = await erc20.queryFilter(filterOwner, -5000, "latest");
      // const logsFrom = await erc20.queryFilter(filterOwner, -5000, "latest");

      console.log('logsFrom')
      console.log(logsFrom)
    }

    if(library) {
      getData();      
    }
  }, [library]);




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
