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
import SummaryCard from "../../components/SummaryCard/SummaryCard";

import { GiParachute } from "react-icons/gi";

import { useWeb3React } from "@web3-react/core";
import { useAirdropFactory } from "../../hooks/useAirdropFactory";
import { getAirdropFactoryAddress } from "../../utils/contracts";

import {
  shortenAddress
} from "../../utils";




function airdropTemplate(address, index) {

  return   {
    type: "Airdrop",
    title: shortenAddress(address),
    // description: "Send tokens for recipients to claim. Great for distributing tokens, issuing staking rewards, or rewarding your community.",
    // more: "Great for rewarding followers or paying contributors",
    icon: GiParachute,
    iconColor: "white",
    backgroundColor: ["blue.500", "yellow.500", "green.500",  "orange.500"][index % 3],
    href: `/airdrop/${address}`
  }

}

function Page() {
  const { library, account, chainId } = useWeb3React();
  const airdropFactory = useAirdropFactory(library, chainId);
  const [airdrops, setAirdrops] = useState({'loading': true, 'data': []});

  useEffect(() => {
    async function getData() {
      const airdropCount = await airdropFactory.airdropCount()
      let data = []

      for (let i = 0; i < airdropCount; i++) {
        let tempData = await airdropFactory.getAirdropAddress(BigNumber.from(i));
        data[i] = airdropTemplate(tempData, i)
      }

      setAirdrops({
        loading: false,
        airdropCount: airdropCount,
        data: data
      })
    }

    if(airdropFactory) {
      getData();      
    }
  },[library, airdropFactory]);



  return (
    <PageContainer>
      <Box bg={mode('purple.50', 'purple.800')}>
        <Box mx="5">
            <Stack as="section">
              <HeadingGroup
                title="Claim Airdrop"
                description="Select an Airdrop to check if you qualify and your claim tokens or NFTs."
              />
              <WalletChecker loading={false} account={account} contractAddress={getAirdropFactoryAddress(chainId)} p="5">
         
                <SimpleGrid columns={{sm: 2, md: 3}} minChildWidth='210px' spacing={5} mx={5} justifyContent="center">
                  {
                    airdrops.data.map((payment, index) => {
                      const params = {
                        key: index,
                        ...payment
                      }
                      return (
                        <SummaryCard
                          key={index}
                          { ...params }
                        />
                      )
                    })
                  }
                </SimpleGrid>
              </WalletChecker>
            </Stack>
        </Box>
      </Box>
    </PageContainer>
  );
}

export default Page;
