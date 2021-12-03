import { useEffect, useState } from "react";
import Link from "next/link";
import { BigNumber } from "ethers";
import {
  Box,
  Stack,
  SimpleGrid,
  Text,
  Flex,
  HStack,
  StackProps,
  HTMLChakraProps,
  createIcon,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import PageContainer from '../../components/PageContainer/PageContainer'
import { HeadingGroup } from '../../components/Forms/HeadingGroup'
import { WalletChecker } from "../../components/WalletChecker";

import { useWeb3React } from "@web3-react/core";
import { useAirdropFactory } from "../../hooks/useAirdropFactory";
import { getAirdropFactoryAddress } from "../../utils/contracts";

import {
  shortenAddress
} from "../../utils";


const RightArrow = createIcon({
  viewBox: '0 0 11 12',
  d: 'M0 0L4.8 6L0 12H5.78182L10.5818 6L5.78182 0H0Z',
})

const FeatureLink = (props: HTMLChakraProps<'a'>) => {
  const { children, href} = props as StackProps
  return (
    <Link href={href}>
      <HStack align="center" fontSize="md" className="group" cursor="pointer">
        <Box fontWeight="semibold">{children}</Box>
        <RightArrow
          color={mode('purple.500', 'purple.400')}
          fontSize="sm"
          transition="transform 0.2s"
          pos="relative"
          top="2px"
          _groupHover={{ transform: 'translateX(2px)' }}
        />
      </HStack>
    </Link>
  )
}

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

  return (
    <PageContainer>
      <Box bg={mode('purple.50', 'purple.800')} py="10">
        <Box maxW="xl" mx="auto">
          <Stack spacing="12">
            <Stack as="section" spacing="6">
              <HeadingGroup
                title="Claim Airdrop"
                description="Select an Airdrop to check if you qualify and your claim tokens or NFTs."
              />
              <WalletChecker loading={false} account={account} contractAddress={getAirdropFactoryAddress(chainId)} p="5">

                <Box ms={{ lg: '12' }} mt={{ base: '12', lg: 0 }} flex="1" maxW={{ lg: 'xl' }}>
                  <SimpleGrid columns={{ base: 1, md: 1 }}>
                    {airdrops.addresses.map((addr) => (
                      <Flex key={addr} align="center" minH="14" borderBottomWidth="1px">
                        <FeatureLink href={"/airdrop/" + addr}>{shortenAddress(addr)}</FeatureLink>
                      </Flex>
                    ))}
                  </SimpleGrid>
                </Box>

              </WalletChecker>
            </Stack>
          </Stack>
        </Box>
      </Box>
    </PageContainer>
  );
}

export default Page;
