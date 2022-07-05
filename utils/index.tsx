import { ethers } from "ethers";
import moment from "moment";
import numeral from "numeral";
import _ from "lodash";
// import { create } from "ipfs-http-client";
import axios from "axios";
import { getAddress as getAddressEthers } from "@ethersproject/address";
import BalanceTree from "./merkleTrees/balance-tree";
import { BigNumber, utils } from "ethers";
import { IPFS_GATEWAY } from "./constants";

import { BLOCK_EXPLORER_LINK } from "./constants";

const env = process.env.REACT_APP_APP_ENV || "test"; // defaulting to after ||

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
    case 31337:
      return "Localhost";
    case 80001:
      return "Mumbai Testnet";
    default:
      return "";
  }
}

export function getBlockExplorerLink(data, type) {
  const prefix = BLOCK_EXPLORER_LINK["mainnet"];

  switch (type) {
    case "transaction": {
      return `${prefix}/tx/${data}`;
    }
    case "token": {
      return `${prefix}/token/${data}`;
    }
    case "block": {
      return `${prefix}/block/${data}`;
    }
    case "address":
    default: {
      return `${prefix}/address/${data}`;
    }
  }
}

// // returns the checksummed address if the address is valid, otherwise returns false
export function isAddress(value) {
  try {
    return ethers.utils.isAddress(value);
    // return getAddressEthers(value)
  } catch {
    return false;
  }
}

// // returns the checksummed address if the address is valid, otherwise returns input
export function getAddress(value) {
  try {
    return getAddressEthers(value);
  } catch {
    return value;
  }
}

export async function isToken(value) {
  if (isAddress(value)) {
    try {
      const _contract = new Contract(
        getAddress(value),
        data.contracts["ERC20"]["abi"],
        web3Context.provider.getSigner()
      );
      const _symbol = await _contract.symbol();
      const _decimals = await _contract.decimals();
      return true;
    } catch (err) {
      return false;
    }
  }

  return false;
}

export async function isERC721(value) {
  if (isAddress(value)) {
    try {
      const _contract = new Contract(
        getAddress(value),
        data.contracts["ERC20"]["abi"],
        web3Context.provider.getSigner()
      );
      const _symbol = await _contract.symbol();
      const _decimals = await _contract.decimals();
      return true;
    } catch (err) {
      return false;
    }
  }

  return false;
}

// Input tx to have 0x + 4 characters at start and end
export function shortenTx(tx: string, chars = 4): string {
  return `${tx.substring(0, chars + 2)}...${tx.substring(66 - chars)}`;
}

// shorten the checksummed version of the input address to have 0x + 4 characters at start and end
export function shortenAddress(address: string, chars = 4): string {
  const parsed = getAddress(address) || address;
  return `${parsed.substring(0, chars + 2)}...${parsed.substring(42 - chars)}`;
}

export function displayTxDatetime(unixTime) {
  return moment.unix(unixTime).fromNow();
}

export function displayISODatetime(unixTime) {
  return moment(unixTime).fromNow();
}

export async function getMerkleData(path) {
  const { data } = await axios.get(`https://ipfs.io/ipfs/${path}`);
  return data;
}

export const createMerkleTree = (recipients) => {
  const tree = new BalanceTree(recipients);
  return tree;
};

// const ipfs = create({
//   host: "ipfs.infura.io",
//   port: 5001,
//   protocol: "https",
// });

export const addTreeToIPFS = async (tree) => {
  const result = await ipfs.add(tree);
  const ipfsURL = `https://gateway.ipfs.io/ipfs/${result.path}`;
  console.log("ipfsURL", ipfsURL);
  return result;
  // const addresses = getAddresses();
  // const addressArray = Object.assign(
  //   addresses.map((v) => ({ address: v, signed: false }))
  // );

  // actions.addContract(result.path, addressArray);
  // setIsDeployed(true);
};
export const switchToNetwork = async (library, chainId) => {
  if (!library?.provider?.request) {
    return;
  }
  const formattedChainId = utils.hexStripZeros(
    BigNumber.from(chainId).toHexString()
  );
  return library?.provider.request({
    method: "wallet_switchEthereumChain",
    params: [{ chainId: formattedChainId }],
  });
};

export function getNativeToken(chainId) {
  if (chainId == 1 || chainId == 42 || chainId == 4) {
    return "ETH";
  } else if (chainId == 137 || chainId == 80001) {
    return "MATIC";
  }
}

// export function formatTokenAmount(amountBN, decimals=18) {
//   return numeral(
//     ethers.utils.formatUnits(
//       amountBN,
//       decimals
//     )).format('0,0.0000')
// }

export function formatUrl(url: string) {
  if (url) {
    const { protocol, pathname } = new URL(url);
    if (protocol === "ipfs:") {
      const contentId = pathname.slice(2);
      return `${IPFS_GATEWAY}/${contentId}`;
    }
  }
  return url;
}

export function formatAmount(amount: string, decimals = 4) {
  const num = Number(amount);
  if (Number.isInteger(num)) return num.toFixed(0);
  return Number(num.toFixed(decimals));
}
