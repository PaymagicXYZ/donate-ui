import { SUPPORTED_NETWORKS } from "../utils/constants";
import { useNetwork } from "@usedapp/core";
import { useEffect, useState } from "react";

export const useIsSupportedNetwork = () => {
  const [isSupportedNetwork, setIsSupportedNetwork] = useState(true);
  const { network } = useNetwork();

  useEffect(() => {
    if (network.chainId)
      setIsSupportedNetwork(network.chainId.toString() in SUPPORTED_NETWORKS);
  }, [network]);

  return isSupportedNetwork;
};
