import {
  DISPERSE_MAINNET,
  DISPERSE_POLYGON,
  DISPERSE_KOVAN,
} from "../constants";

export const getDisperseAddress = (chainId) => {
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
