import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  Box,
  Stack,
  StackProps,
  Link,
  Text,
  Image,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import PageContainer from "../../../components/PageContainer/PageContainer";
import { Card } from "../../../components/Card/Card";
import { HeadingGroup } from "../../../components/Forms/HeadingGroup";
import Topsafes from "../../../components/Safes/Topsafes";
import { createClient } from "urql";

export default function Page() {
  let props;
  const [graphData, setGraphData] = useState({
    loading: true,
    subgraph: null,
  });
  const APIURL =
    "https://api.thegraph.com/subgraphs/name/gjeanmart/gnosis-safe-mainnet";

  const client = createClient({
    url: APIURL,
  });

  const tokensQuery = `
  query {
  wallets {
    id
    stamp
    owners
    threshold
    creator
    factory
    version
    currentNonce
  }
}
`;
  useEffect(() => {
    fetchTopSafes();
  }, []);

  async function fetchTopSafes() {
    const data = await client.query(tokensQuery).toPromise();
    console.log(data);
    setGraphData({ loading: false, subgraph: data });
  }

  return (
    <PageContainer>
      <Box bg={mode("purple.50", "purple.800")}>
        <Box mx="auto" w="90%">
          <Card>
            <pre>
              <code>{JSON.stringify(graphData, null, 2)}</code>
            </pre>
          </Card>
        </Box>
      </Box>
    </PageContainer>
  );
}
