import {
  Box,
  Text,
  Stack,
  StackProps,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import PageContainer from "../../components/PageContainer/PageContainer";
import { Card } from "../../components/Card/Card";
import { WalletChecker } from "../../components/WalletChecker";
import { HeadingGroup } from "../../components/Forms/HeadingGroup";
import HoldingsList from "../../components/Holdings/HoldingsList";
import { useWeb3React } from "@web3-react/core";
import { useZapper } from "../../hooks/useZapper";
import { ZAPPER_NETWORK } from "../../utils/constants";
import { shortenAddress, translateChainId } from "../../utils";
import { ZapperNetworkForChain } from "../../components/Holdings/networkForChain";

export default function Page() {
  let props;
  const { library, account, chainId } = useWeb3React();
  const walletData = useZapper(account, ZAPPER_NETWORK);

  return (
    <PageContainer>
      <Box bg={mode("purple.50", "purple.800")}>
        <Box mx="auto" w="90%">
          <Stack as="section" spacing="6" {...props}>
            <WalletChecker
              loading={false}
              account={account}
            >
              <HeadingGroup title={shortenAddress(account)} subtitle={translateChainId(chainId)} size="lg" />
              <Card>
                <HoldingsList />
              </Card>
            </WalletChecker>
          </Stack>
        </Box>
      </Box>
    </PageContainer>
  );
}