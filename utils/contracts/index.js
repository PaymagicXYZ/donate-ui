import {
  DISPERSE_MAINNET,
  DISPERSE_POLYGON,
  DISPERSE_KOVAN,
  DISPERSENFT_MAINNET,
  DISPERSENFT_POLYGON,
  DISPERSENFT_KOVAN,
  AIRDROPFACTORY_MAINNET,
  AIRDROPFACTORY_POLYGON,
  AIRDROPFACTORY_KOVAN,
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
      return AIRDROPFACTORY_MAINNET;
    case 42:
      return AIRDROPFACTORY_KOVAN;
    case 137:
      return AIRDROPFACTORY_POLYGON;
    default:
      return "";
  }
};
