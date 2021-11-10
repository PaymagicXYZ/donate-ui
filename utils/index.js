import { ethers } from "ethers";
import { getAddress as getAddressEthers } from '@ethersproject/address'

import { BLOCK_EXPLORER_LINK } from "./constants";

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

export async function isToken(value, web3Context, data) {
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