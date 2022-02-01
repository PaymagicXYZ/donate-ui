import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Center,
  Box,
  Text,
  Spacer,
  Stack,
  Flex,
  StackProps,
  Grid,
  GridItem,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import PageContainer from "../../components/PageContainer/PageContainer";
import { Card } from "../../components/Card/Card";
import { WalletChecker } from "../../components/WalletChecker";
import { HeadingGroup } from "../../components/Forms/HeadingGroup";
import HoldingsList from "../../components/Holdings/HoldingsList";
import { useWeb3React } from "@web3-react/core";
import { useZapper } from "../../hooks/useZapper";
import { useCovalent } from "../../hooks/useCovalent";
import { ZAPPER_NETWORK, CovalentNetworkForID } from "../../utils/constants";
import { shortenAddress, translateChainId } from "../../utils";
import { ZapperNetworkForChain } from "../../components/Holdings/networkForChain";
import { ChevronDownIcon } from '@chakra-ui/icons'
import { ListContent } from "../../components/Holdings/ListContent";
import { ChartContent } from "../../components/Holdings/ChartContent";
import { HistoryChart } from "../../components/Dashboard/HistoryChart";

export default function Page() {
  let props;
  const { library, account, chainId } = useWeb3React();
  const walletData = useZapper(account, ZAPPER_NETWORK);
  const covalentData = useCovalent(account,chainId)

  return (
    <PageContainer>
      <Box bg={mode("purple.50", "purple.800")}>
        <Box mx="auto" w="90%">
          <WalletChecker
            loading={walletData.loading && covalentData.loading}
            account={account}
          >
          <Flex>
            <HeadingGroup title={account} subtitle={translateChainId(chainId)} size="lg" />
            <Spacer />
            <Center>
              <Menu my="1">
                <MenuButton as={Button} colorScheme="purple" rightIcon={<ChevronDownIcon />}>
                  Actions
                </MenuButton>
                <MenuList>
                  <MenuItem>Send Payment</MenuItem>
                  <MenuItem>Run Payroll</MenuItem>
                  <MenuItem>Send Airdrop</MenuItem>
                  <MenuItem>Create Vesting</MenuItem>
                </MenuList>
              </Menu>
            </Center>
          </Flex>
            <Grid
              h='1000px'
              templateRows='repeat(4, 1fr)'
              templateColumns='repeat(4, 1fr)'
              gap={4}
            >
              <GridItem colSpan={3}>
                <Card>
                  <HistoryChart covalentData={covalentData} />
                </Card>
              </GridItem>
              <GridItem colSpan={1} rowSpan={2} bg='papayawhip' />
              <GridItem colSpan={3}>
                <Card>
                  { false && <ListContent walletData={walletData.assets} /> }
                </Card>
              </GridItem>
              <GridItem colSpan={4}>
                <Card>
                  <Text>Test</Text>
                </Card>
              </GridItem>
            </Grid>
          </WalletChecker>
        </Box>
      </Box>
    </PageContainer>
  );
}