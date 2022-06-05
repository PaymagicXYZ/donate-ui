import { useState, useEffect } from "react";
import { useDisclosure } from "@chakra-ui/react";
import { useNetwork, useEthers } from "@usedapp/core";
import { DEBUG, Network, SUPPORTED_NETWORKS } from "../../utils/constants";

import Select from "../Select";
import ModalList from "../ModalList";

const defaultNetworkId = DEBUG ? 42 : 1;

const NetworkMenu = () => {
  const { network } = useNetwork();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { switchNetwork, active } = useEthers();
  const [selectedNetwork, setSelectedNetwork] = useState<Network>();

  const handleOfflineChange = (chainId: number) => {
    setSelectedNetwork(SUPPORTED_NETWORKS[chainId]);
  };

  const networkOptions = Object.entries(SUPPORTED_NETWORKS).map(
    ([chainId, chainInfo]) => ({
      name: chainInfo.name,
      logo: chainInfo.logo,
      onClick: () => {
        active ? switchNetwork(+chainId) : handleOfflineChange(+chainId);
        onClose();
      },
    })
  );

  useEffect(() => {
    const networkData =
      SUPPORTED_NETWORKS[network.chainId] ||
      SUPPORTED_NETWORKS[defaultNetworkId];
    setSelectedNetwork(networkData);
  }, [network]);

  return (
    <>
      <Select
        disabled={false}
        onClick={onOpen}
        value={selectedNetwork?.name}
        logoURI={selectedNetwork?.logo.src}
        placeHolderText="Unsupported network"
      />
      <ModalList
        title="Select Network"
        items={networkOptions}
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
};

export default NetworkMenu;
