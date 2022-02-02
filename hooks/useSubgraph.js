import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { useEffect, useState } from "react";
import _ from "lodash";
import { createClient } from "urql";

const APIURL =
  "https://api.thegraph.com/subgraphs/name/gjeanmart/gnosis-safe-mainnet";

const client = createClient({
  url: APIURL,
});

// const APIURL =
//   "https://api.studio.thegraph.com/query/gjeanmart/gnosis-safe-mainnet/";

const tokensQuery = `
  query {
  wallet(id: "0x8e4d87ad4dafdac06d86a3ed002f5085dc036e08") {
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

// function getSafeQuery(id)=>{return `query {
//       wallets(id: "${id}") {
//         id
//     creator
//     network
//     stamp
//     hash
//     factory
//     mastercopy
//     owners
//     threshold
//     currentNonce
//     version
//       }`}

export function useSubgraph(address) {
  const [data, setData] = useState({
    loading: true,
    subgraph: null,
  });
  useEffect(() => {
    async function getData() {
      const data = await client.query(tokensQuery).toPromise();
      console.log(data);
      setData({ loading: false, subgraph: data });
      // console.log("Subgraph data: ", data);
    }

    if (!_.isUndefined(address)) {
      getData(address);
    }
  }, [address]);

  return data;
}
