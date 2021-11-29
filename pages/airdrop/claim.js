import { useEffect, useState } from "react";
import Link from "next/link";
import { BigNumber } from "ethers";
import {
  Box,
  Stack,
  SimpleGrid,
  Text
} from "@chakra-ui/react";
import PageContainer from '../../components/PageContainer/PageContainer'

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

  const airdropGrid = airdrops.addresses.map((airdrop, index) => (
    <Box
      key={index}
      role={"group"}
      p={6}
      m="5"
      maxW={"430px"}
      minW={"230px"}
      w={"full"}
      bg={"white"}
      boxShadow={"2xl"}
      rounded={"lg"}
      pos={"relative"}
      zIndex={1}
    >
      <Link href={"/airdrop/" + airdrop}>
        <a>
          <Box
            rounded={"lg"}
            mt={-12}
            pos={"static"}
            height={"230px"}
            _groupHover={{
              _after: {
                filter: "blur(20px)",
              },
            }}
          >
          </Box>

          <Stack pt={10} align={"center"}>
            <Text color={"gray.600"}>{ shortenAddress(airdrop) }</Text>
          </Stack>
        </a>
      </Link>
    </Box>
  ));

  return (
    <PageContainer>
      <SimpleGrid columns={3} spacing={5} justifyContent="center">
        { airdropGrid }
      </SimpleGrid>
    </PageContainer>
  );
}

export default Page;
