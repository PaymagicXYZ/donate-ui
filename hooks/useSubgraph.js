import { useEffect, useState } from "react";
import _ from "lodash";
import { createClient } from "urql";

const APIURL = {
  mainnet:
    "https://api.thegraph.com/subgraphs/name/gjeanmart/gnosis-safe-mainnet",
  polygon:
    "https://api.thegraph.com/subgraphs/name/gjeanmart/gnosis-safe-polygon",
};

const returnClient = (network) =>
  createClient({
    url: APIURL[network],
  });

const returnQuery = (address) => `
  query {
  wallet(id: "${address}") {
    id
    creator
    network
    stamp
    hash
    factory
    mastercopy
    owners
    threshold
    currentNonce
    version
  }
}
`;

const tokensQuery = `query {
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
}`;

export function useSubgraph(address, network = "mainnet") {
  const client = returnClient(network);
  const [graphData, setGraphData] = useState({
    loading: true,
    subgraph: null,
  });

  useEffect(() => {
    address ? fetchSafe(address) : fetchTopSafes();
  }, [address, network]);

  async function fetchTopSafes() {
    const data = await client.query(tokensQuery).toPromise();
    console.log(data);
    setGraphData({ loading: false, subgraph: data });
  }

  async function fetchSafe(address) {
    const data = await client.query(returnQuery(address)).toPromise();
    setGraphData({ loading: false, subgraph: data });
  }

  return graphData;
}
