import { useState, useEffect } from "react";
import { Spinner, useDisclosure, Box } from "@chakra-ui/react";
import { useNetwork, useEthers } from "@usedapp/core";
import { Network } from "../../utils/constants";
import {
  useDevMode,
  useIsSupportedNetwork,
  useSupportedNetworks,
} from "../../hooks";

import Select from "../Select";
import ModalList from "../ModalList";
import { useSwitchNetwork } from "../../hooks";

const NetworkMenu = () => {
  const { isDevMode } = useDevMode();
  const isSupportedNetwork = useIsSupportedNetwork();
  const [networkLoading, setNetworkLoading] = useState<string>();
  const { network } = useNetwork();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { account } = useEthers();
  const { switchNetwork, isLoading } = useSwitchNetwork();
  const [selectedNetwork, setSelectedNetwork] = useState<Network>();
  const supportedNetworks = useSupportedNetworks();

  const defaultNetworkId = isDevMode ? 42 : 1;

  const handleOfflineChange = (chainId: number) => {
    setSelectedNetwork(supportedNetworks[chainId]);
  };

  const networkOptions = Object.entries(supportedNetworks).map(
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
    if (!isSupportedNetwork) {
      setSelectedNetwork(null);
    } else {
      const networkData =
        supportedNetworks[network.chainId] ||
        supportedNetworks[defaultNetworkId];
      setSelectedNetwork(networkData);
    }
  }, [network, isSupportedNetwork]);

  const name = !isSupportedNetwork
    ? "Unsupported Network"
    : selectedNetwork?.name;
  const logo = !isSupportedNetwork ? null : selectedNetwork?.logo.src;

  return (
    <>
      <Select
        errorMessage={!isSupportedNetwork && "Connect to a supported network."}
        disabled={false}
        onClick={onOpen}
        value={name}
        logoURI={logo}
        placeHolderText="Pick a network"
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
