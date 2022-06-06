import { useState, useEffect } from "react";
import { Spinner, useDisclosure, Box } from "@chakra-ui/react";
import { useNetwork, useEthers } from "@usedapp/core";
import { DEBUG, Network, SUPPORTED_NETWORKS } from "../../utils/constants";

import Select from "../Select";
import ModalList from "../ModalList";
import { useSwitchNetwork } from "../../hooks";

const defaultNetworkId = DEBUG ? 42 : 1;

const NetworkMenu = () => {
  const [isUnsupportedChain, setUnsupportedChain] = useState(false);
  const [networkLoading, setNetworkLoading] = useState<string>();
  const { network } = useNetwork();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { account } = useEthers();
  const { switchNetwork, isLoading } = useSwitchNetwork();
  const [selectedNetwork, setSelectedNetwork] = useState<Network>();

  const handleOfflineChange = (chainId: number) => {
    setSelectedNetwork(SUPPORTED_NETWORKS[chainId]);
  };

  const networkOptions = Object.entries(SUPPORTED_NETWORKS).map(
    ([chainId, chainInfo]) => {
      const adornment =
        chainId === networkLoading && isLoading ? (
          <Spinner />
        ) : chainInfo.name === selectedNetwork?.name ? (
          <Box h="12px" w="12px" borderRadius="10px" bg="success" />
        ) : null;
      return {
        name: chainInfo.name,
        logo: chainInfo.logo,
        adornment,
        onClick: async () => {
          setNetworkLoading(chainId);
          account
            ? await switchNetwork(+chainId)
            : handleOfflineChange(+chainId);
          setNetworkLoading(null);
          onClose();
        },
      };
    }
  );

  useEffect(() => {
    const unsupportedChain = !(
      network.chainId?.toString() in SUPPORTED_NETWORKS
    );
    if (network.chainId && unsupportedChain) {
      setUnsupportedChain(true);
      setSelectedNetwork(null);
    } else {
      const networkData =
        SUPPORTED_NETWORKS[network.chainId] ||
        SUPPORTED_NETWORKS[defaultNetworkId];
      setUnsupportedChain(false);
      setSelectedNetwork(networkData);
    }
  }, [network]);

  const name = isUnsupportedChain
    ? "Unsupported Network"
    : selectedNetwork?.name;
  const logo = isUnsupportedChain ? null : selectedNetwork?.logo.src;

  return (
    <>
      <Select
        errorMessage={isUnsupportedChain && "Connect to a supported network."}
        disabled={false}
        onClick={onOpen}
        value={name}
        logoURI={logo}
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
