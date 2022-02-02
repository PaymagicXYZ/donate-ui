import { useRouter } from "next/router";
import { useEffect, useState, useMemo } from "react";
import {
  Box,
  Stack,
  StackProps,
  Link,
  Text,
  Image,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import { ethers } from "ethers";
import PageContainer from "../../../components/PageContainer/PageContainer";
import { Card } from "../../../components/Card/Card";
import { HeadingGroup } from "../../../components/Forms/HeadingGroup";
import HoldingsList from "../../../components/Holdings/HoldingsList";
const { default: Resolution } = require("@unstoppabledomains/resolution");
import { ZapperNetworkForChain } from "../../../components/Holdings/networkForChain";
import { useSubgraph } from "../../../hooks/useSubgraph";

export default function Page() {
  let props;
  const router = useRouter();
  const [Altname, setAltname] = useState();
  const [address, setAddress] = useState();
  const [account, setAccount] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isSafe, setIsSafe] = useState(false);
  const { inputChain, accountAddress } = router.query;
  let chain = ZapperNetworkForChain[inputChain];
  const validAddress = new RegExp(/^0x[a-fA-F0-9]{40}$/);
  const validETHAddress = new RegExp(/(\.?(eth)$)/);
  const validUDAddress = new RegExp(
    /(\.?(zil|crypto|nft|blockchain|bitcoin|coin|wallet|888|dao|x)$)/
  );
  const provider = ethers.getDefaultProvider();
  const resolution = new Resolution();
  const graphData = useSubgraph(address ? address : accountAddress);
  // console.log(graphData);
  useEffect(() => {
    if (validAddress.test(accountAddress)) {
      setAccount(true);
      setLoading(false);
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
    } else if (validETHAddress.test(accountAddress) && chain === "ethereum") {
      const getENSresolve = async () => {
        try {
          const resolver = await provider.getResolver(accountAddress);
          setAddress(await resolver.getAddress());
          setAccount(true);
          setLoading(false);
        } catch (err) {
          console.log(err);
          setLoading(false);
        }
      };
      getENSresolve();
    } else if (validUDAddress.test(accountAddress)) {
      function resolve(domain, currency) {
        resolution
          .addr(domain, currency)
          .then((address) => {
            if (address) {
              console.log(domain, "resolves to", address);
              setAccount(true);
              setLoading(false);
            }
          })
          .catch(console.error);
        setLoading(false);
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
    } else {
      setLoading(false);
    }
    try {
      if (graphData.loading == false && graphData.subgraph.data.wallet) {
        if (graphData.subgraph.data.wallet.version) {
          setIsSafe(true);
        }
      }
    } catch (err) {
      console.log(err);
    }
  });

  const displayAddress = (address) => (
    <Link href={`/accounts/${inputChain}/${address}`} color="teal.500">
      {address}
    </Link>
  );

  return (
    <PageContainer>
      <Box bg={mode("purple.50", "purple.800")}>
        <Box mx="auto" w="90%">
          {loading ? (
            <Text>Resolving your address ...</Text>
          ) : account ? (
            <Stack as="section" spacing="6" {...props}>
              <HeadingGroup
                title={`Holdings for ${isSafe ? "safe" : ""} "${
                  Altname ? Altname : accountAddress
                }" on ${chain}`}
                size="lg"
              />
              {isSafe ? (
                <>
                  <Text>
                    This {graphData.subgraph.data.wallet.version} safe is
                    created by{" "}
                    {displayAddress(graphData.subgraph.data.wallet.creator)}
                    <br />
                    The owners of the safe:
                    <br />
                    {graphData.subgraph.data.wallet.owners.map((owner) => (
                      <>
                        {displayAddress(owner)} <br />
                      </>
                    ))}
                  </Text>
                </>
              ) : (
                <Text>
                  Please be aware, this might not be your account. &nbsp;
                  <Link href="/holdings" color="teal.500">
                    To your account
                  </Link>
                </Text>
              )}

              <Card>
                <HoldingsList
                  chain={chain}
                  accountAddress={address ? address : accountAddress}
                />
              </Card>
            </Stack>
          ) : (
            <>
              <HeadingGroup
                title={
                  chain
                    ? `Unable to find ${accountAddress} on ${chain}`
                    : `${inputChain} is not a valid chain, please try "eth" or "matic"`
                }
                size="lg"
              />
              <Text>
                Please check if you have the valid address. &nbsp;
                <Link href="/holdings" color="teal.500">
                  To your account
                </Link>
              </Text>
            </>
          )}
          <Link href="https://zapper.fi/" isExternal>
            <Image
              src="/power-zap-gray.svg"
              width="250px"
              maxWidth="15vw"
              alt="Powered by Zapper"
            />
          </Link>
          <Link href="https://www.covalenthq.com" isExternal>
            <Image
              width="250px"
              maxWidth="15vw"
              src="/Powered_by_Covalent_Stacked_Full.svg"
              alt="Powered by covalent"
            />
          </Link>
        </Box>
      </Box>
    </PageContainer>
  );
}
