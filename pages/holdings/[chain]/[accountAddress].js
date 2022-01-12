import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  Box,
  Stack,
  StackProps,
  Link,
  Text,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import { ethers } from "ethers";
import PageContainer from "../../../components/PageContainer/PageContainer";
import { Card } from "../../../components/Card/Card";
import { HeadingGroup } from "../../../components/Forms/HeadingGroup";
import HoldingsList from "../../../components/Holdings/HoldingsList";
const { default: Resolution } = require("@unstoppabledomains/resolution");

export default function Page() {
  let props;
  const router = useRouter();
  const [Altname, setAltname] = useState();
  const [address, setAddress] = useState();
  const { chain, accountAddress } = router.query;
  const validAddress = new RegExp(/^0x[a-fA-F0-9]{40}$/);
  const validETHAddress = new RegExp(/(\.?(eth)$)/);
  const validUDAddress = new RegExp(
    /(\.?(zil|crypto|nft|blockchain|bitcoin|coin|wallet|888|dao|x)$)/
  );
  const provider = ethers.getDefaultProvider();
  const resolution = new Resolution();

  useEffect(() => {
    if (validAddress.test(accountAddress)) {
      if (chain === "ethereum") {
        const getENSname = async () => {
          try {
            setAltname(await provider.lookupAddress(accountAddress));
          } catch (err) {
            console.log(err);
          }
        };
        getENSname();
      }
    }
    if (validETHAddress.test(accountAddress) && chain === "ethereum") {
      const getENSresolve = async () => {
        try {
          const resolver = await provider.getResolver(accountAddress);
          setAddress(await resolver.getAddress());
          console.log(address);
        } catch (err) {
          console.log(err);
        }
      };
      getENSresolve();
    }

    if (validUDAddress.test(accountAddress)) {
      function resolve(domain, currency) {
        resolution
          .addr(domain, currency)
          .then((address) => console.log(domain, "resolves to", address))
          .catch(console.error);
      }
      const getUDresolve = async (coin) => {
        try {
          setAddress(resolve(accountAddress, coin));
        } catch (err) {
          console.log(err);
        }
      };
      if (chain === "ethereum") {
        getUDresolve("ETH");
      }
      if (chain === "polygon") {
        getUDresolve("MATIC");
      }
    }
  });

  return (
    <PageContainer>
      <Box bg={mode("purple.50", "purple.800")} py="10">
        <Box mx="auto" w="90%">
          <Stack as="section" spacing="6" {...props}>
            <HeadingGroup
              title={`Holdings for "${
                Altname ? Altname : accountAddress
              }" on ${chain}`}
              size="lg"
            />
            <Text>
              Please be aware, this might not be your account. &nbsp;
              <Link href="/holdings" color="teal.500">
                To your account
              </Link>
            </Text>

            <Card>
              <HoldingsList
                chain={chain}
                accountAddress={address ? address : accountAddress}
              />
            </Card>
          </Stack>
        </Box>
      </Box>
    </PageContainer>
  );
}
