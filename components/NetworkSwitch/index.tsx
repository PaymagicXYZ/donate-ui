import { useState, useEffect } from "react";
import { useDisclosure } from "@chakra-ui/react";
import { useNetwork } from "@usedapp/core";
import { DEBUG, Network, SUPPORTED_NETWORKS } from "../../utils/constants";

import Select from "../Select";
import NetworkList from "./NetworkList";

const NetworkMenu = () => {
  const { network } = useNetwork();
  const defaultNetworkId = DEBUG ? 42 : 1;
  const [selectedNetwork, setSelectedNetwork] = useState<Network>();

  const { isOpen, onClose, onOpen } = useDisclosure();

  useEffect(() => {
    const networkData =
      SUPPORTED_NETWORKS[network.chainId] ||
      SUPPORTED_NETWORKS[defaultNetworkId];
    setSelectedNetwork(networkData);
    console.log(networkData);
  }, [network]);
  const handleOfflineChange = (chainId: number) => {
    setSelectedNetwork(SUPPORTED_NETWORKS[chainId]);
  };
  return (
    <>
      <Select
        disabled={false}
        onClick={onOpen}
        value={selectedNetwork?.name}
        logoURI={selectedNetwork?.logo.src}
        placeHolderText="Unsupported network"
      />
      <NetworkList
        isOpen={isOpen}
        onClose={onClose}
        offlineClick={handleOfflineChange}
      />
    </>
  );
};

export default NetworkMenu;
