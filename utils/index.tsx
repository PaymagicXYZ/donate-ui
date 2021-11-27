import { ethers } from "ethers";
import moment from "moment";
// import { create } from "ipfs-http-client";
import axios from "axios";
import { getAddress as getAddressEthers } from '@ethersproject/address'

import {
  BLOCK_EXPLORER_LINK
} from "./constants";

import development from "./contractData/kovanPaymagic";
import test from "./contractData/kovanPaymagic";
import kovan from "./contractData/kovanPaymagic";
// import polygon from "./contractData/polygonPaymagic";
// import mainnet from "./contractData/mainnetPaymagic";
// import production from "./contractData/mainnetPaymagic";

const env = process.env.REACT_APP_APP_ENV || 'test'; // defaulting to after ||

const config = {
  development,
  test,
  kovan,
  // polygon,
  // mainnet,
  // production
};

export const contractData = config[env]

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

export function getBlockExplorerLink(data, type) {
  const prefix = BLOCK_EXPLORER_LINK

  switch (type) {
    case 'transaction': {
      return `${prefix}/tx/${data}`
    }
    case 'token': {
      return `${prefix}/token/${data}`
    }
    case 'block': {
      return `${prefix}/block/${data}`
    }
    case 'address':
    default: {
      return `${prefix}/address/${data}`
    }
  }
}

// // returns the checksummed address if the address is valid, otherwise returns false
export function isAddress(value) {
  try {
    return ethers.utils.isAddress(value)
    // return getAddressEthers(value)
  } catch {
    return false
  }
}

// // returns the checksummed address if the address is valid, otherwise returns input
export function getAddress(value) {
  try {
    return getAddressEthers(value)
  } catch {
    return value
  }
}

export async function isToken(value) {
  if(isAddress(value)){
    try {
      const _contract = new Contract(
        getAddress(value),
        data.contracts['ERC20']['abi'],
        web3Context.provider.getSigner()
      );
      const _symbol = await _contract.symbol()
      const _decimals = await _contract.decimals()
      return true
    }
    catch(err) {
      return false
    }    
  }

  return false
}

export async function isERC721(value) {
  if(isAddress(value)){
    try {
      const _contract = new Contract(
        getAddress(value),
        data.contracts['ERC20']['abi'],
        web3Context.provider.getSigner()
      );
      const _symbol = await _contract.symbol()
      const _decimals = await _contract.decimals()
      return true
    }
    catch(err) {
      return false
    }    
  }

  return false
}

// Input tx to have 0x + 4 characters at start and end
export function shortenTx(tx: string, chars = 4): string {
  return `${tx.substring(0, chars + 2)}...${tx.substring(66 - chars)}`
}

// shorten the checksummed version of the input address to have 0x + 4 characters at start and end
export function shortenAddress(address: string, chars = 4): string {
  const parsed = getAddress(address)
  if (!parsed) {
    throw Error(`Invalid 'address' parameter '${address}'.`)
  }
  return `${parsed.substring(0, chars + 2)}...${parsed.substring(42 - chars)}`
}

export function displayTxDatetime(unixTime) {
  return moment.unix(unixTime).fromNow();
}

export async function getMerkleData(path) {
  const { data } = await axios.get(`https://ipfs.io/ipfs/${path}`);
  return data;
}

// const ipfs = create({
//   host: "ipfs.infura.io",
//   port: 5001,
//   protocol: "https",
// });

export const addTreeToIPFS = async tree => {
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