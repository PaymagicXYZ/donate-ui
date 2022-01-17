import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

// const APIURL = 'https://api.thegraph.com/subgraphs/name/gjeanmart/gnosis-safe-mainnet';

const APIURL =
  "https://api.studio.thegraph.com/query//gjeanmart/gnosis-safe-mainnet/";

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

const client = new ApolloClient({
  uri: APIURL,
  cache: new InMemoryCache(),
});

client
  .query({
    query: gql(tokensQuery),
  })
  .then((data) => console.log("Subgraph data: ", data))
  .catch((err) => {
    console.log("Error fetching data: ", err);
  });
