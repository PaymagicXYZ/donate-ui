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
    async function getData(address) {
      client
        .query({
          query: gql(tokensQuery),
        })
        .then((data) => {
          setData({ loading: false, subgraph: data });
          console.log("Subgraph data: ", data);
        })
        .catch((err) => {
          console.log("Error fetching data: ", err);
        });
    }

    if (!_.isUndefined(address)) {
      getData(address);
    }
  }, [address]);

  return data;
}
