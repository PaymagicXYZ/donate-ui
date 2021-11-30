import { useEffect, useState } from "react";
import Link from "next/link";
import { BigNumber } from "ethers";
import {
  Box,
  Stack,
  SimpleGrid,
  Text,
  Flex,
  useColorModeValue
} from "@chakra-ui/react";
import PageContainer from '../../components/PageContainer/PageContainer'
import { FeatureLink } from '../../components/AirdropFeature/FeatureLink'
import { HeadingGroup } from '../../components/Forms/HeadingGroup'

import { useWeb3React } from "@web3-react/core";
import { useAirdropFactory } from "../../hooks/useAirdropFactory";
import {
  shortenAddress
} from "../../utils";


function Page() {
  const { library, account, chainId } = useWeb3React();
  const airdropFactory = useAirdropFactory(library, chainId);
  const [airdrops, setAirdrops] = useState({'loading': true, 'addresses': []});

  useEffect(() => {
    async function getData() {
      const airdropCount = await airdropFactory.airdropCount()
      let addresses = []

      for (let i = 0; i < airdropCount; i++) {
        addresses[i] = await airdropFactory.getAirdropAddress(BigNumber.from(i));
      }

      setAirdrops({
        loading: false,
        airdropCount: airdropCount,
        addresses: addresses
      })
    }
    if(airdropFactory) {
      getData();      
    }
  },[library, airdropFactory]);

  let props

  return (
    <PageContainer>
      <Box bg={useColorModeValue('purple.50', 'purple.800')} py="10">
        <Box maxW="xl" mx="auto">
          <Stack spacing="12">
            <Stack as="section" spacing="6" {...props}>
              <HeadingGroup
                title="Claim Airdrop Tokens/NFTs"
                description="Select an Airdrop to see if you qualify to claim tokens or NFTs."
              />

              <Box maxW={{ base: 'xl', md: '7xl' }} mx="auto" px={{ base: '6', md: '8' }}>
                <Flex direction={{ base: 'column', lg: 'row' }} justify="space-between">
                  <Box ms={{ lg: '12' }} mt={{ base: '12', lg: 0 }} flex="1" maxW={{ lg: 'xl' }}>
                    <SimpleGrid columns={{ base: 1, md: 1 }} mt="8">
                      {airdrops.addresses.map((addr) => (
                        <Flex key={addr} align="center" minH="14" borderBottomWidth="1px">
                          <FeatureLink href={"/airdrop/" + addr}>{shortenAddress(addr)}</FeatureLink>
                        </Flex>
                      ))}
                    </SimpleGrid>
                  </Box>
                </Flex>
              </Box>



            </Stack>
          </Stack>
        </Box>
      </Box>
    </PageContainer>
  );
}

export default Page;
