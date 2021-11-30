import {
  DISPERSE_MAINNET,
  DISPERSE_POLYGON,
  DISPERSE_KOVAN,
  DISPERSENFT_MAINNET,
  DISPERSENFT_POLYGON,
  DISPERSENFT_KOVAN,
  AIRDROP_FACTORY_MAINNET,
  AIRDROP_FACTORY_POLYGON,
  AIRDROP_FACTORY_KOVAN,
} from "../constants";

export const getDisperseAddress = (chainId=1) => {
  switch (chainId) {
    case 1:
      return DISPERSE_MAINNET;
    case 42:
      return DISPERSE_KOVAN;
    case 137:
      return DISPERSE_POLYGON;
    default:
      return "";
  }
};

export const getDisperseNFTAddress = (chainId=1) => {
  switch (chainId) {
    case 1:
      return DISPERSENFT_MAINNET;
    case 42:
      return DISPERSENFT_KOVAN;
    case 137:
      return DISPERSENFT_POLYGON;
    default:
      return "";
  }
};

export const getAirdropFactoryAddress = (chainId=1) => {
  switch (chainId) {
    case 1:
      return AIRDROP_FACTORY_MAINNET;
    case 42:
      return AIRDROP_FACTORY_KOVAN;
    case 137:
      return AIRDROP_FACTORY_POLYGON;
    default:
      return "";
  }
};
