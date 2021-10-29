export function translateChainId(chainId) {
  switch (chainId) {
    case 1:
      return "Mainnet";
    case 3:
      return "Ropsten";
    case 4:
      return "Rinkeby";
    case 42:
      return "Kovan";
    case 137:
      return "Polygon";
    case 420:
      return "Goerli";
    case 1337:
      return "Localhost";
    case 80001:
      return "Mumbai Testnet";
    default:
      return "";
  }
}
