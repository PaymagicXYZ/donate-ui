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

export default function Page() {
  let props;
  const router = useRouter();
  const [ENSname, setENSname] = useState();
  const { chain, accountAddress } = router.query;
  const validAddress = new RegExp(/^0x[a-fA-F0-9]{40}$/);

  useEffect(() => {
    if (chain === "ethereum") {
      const provider = ethers.getDefaultProvider();
      if (validAddress.test(accountAddress)) {
        const getENSname = async () => {
          try {
            setENSname(await provider.lookupAddress(accountAddress));
          } catch (err) {
            console.log(err);
          }
        };
        getENSname();
      }
    } else if
  });
  return (
    <PageContainer>
      <Box bg={mode("purple.50", "purple.800")} py="10">
        <Box mx="auto" w="90%">
          <Stack as="section" spacing="6" {...props}>
            <HeadingGroup
              title={`Holdings for "${
                ENSname ? ENSname : accountAddress
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
              <HoldingsList chain={chain} accountAddress={accountAddress} />
            </Card>
          </Stack>
        </Box>
      </Box>
    </PageContainer>
  );
}
