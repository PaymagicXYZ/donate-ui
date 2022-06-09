import { useNetwork } from "@usedapp/core";
import { useEffect, useState } from "react";
import { useSupportedNetworks } from "./useSupportedNetworks";

export const useIsSupportedNetwork = () => {
  const [isSupportedNetwork, setIsSupportedNetwork] = useState(true);
  const { network } = useNetwork();
  const supportedNetworks = useSupportedNetworks();

  useEffect(() => {
    if (network.chainId)
      setIsSupportedNetwork(network.chainId.toString() in supportedNetworks);
  }, [network, supportedNetworks]);

  return isSupportedNetwork;
};
