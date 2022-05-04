import {
  Menu,
  MenuButton,
  Button,
  Flex,
  MenuList,
  Text,
  MenuItem,
  Spacer,
  Box,
} from "@chakra-ui/react";
import { useNetwork, useEthers } from "@usedapp/core";
import { ChevronDownIcon } from "@chakra-ui/icons";
import ethereumLogo from "./assets/eth_logo.png";
import polygonLogo from "./assets/polygon_logo.png";
import avalancheLogo from "./assets/avalanche_logo.png";
import optimismLogo from "./assets/optimism_logo.svg";

import Image, { ImageProps } from "next/image";

const NetworkLogo = (props: ImageProps) => (
  <Flex style={{ marginRight: 7 }}>
    <Image width={20} height={20} {...props} />
  </Flex>
);

const NETWORKS = {
  1: {
    name: "Ethereum",
    logo: ethereumLogo,
  },
  10: {
    name: "Optimism",
    logo: optimismLogo,
  },
  42: {
    name: "Kovan",
    logo: ethereumLogo,
  },
  43114: {
    name: "Avalanche",
    logo: avalancheLogo,
  },
  137: {
    name: "Polygon",
    logo: polygonLogo,
  },
};

const getMenuBtnContent = (chainId: number) => {
  const chain = NETWORKS[chainId];
  return (
    chain && (
      <Flex alignItems="center">
        <NetworkLogo src={chain.logo} />
        <Text>{chain.name}</Text>
        <ChevronDownIcon className="w-6 h-6 ml-2" />
      </Flex>
    )
  );
};

const NetworkMenu = () => {
  const { network } = useNetwork();
  const { switchNetwork } = useEthers();
  const getHandler = (chainId: number) => () => {
    switchNetwork(chainId);
  };
  return (
    <Menu>
      <MenuButton
        as={Button}
        bg="purple.100"
        color="black"
        borderRadius="15px"
        py="3"
        w="full"
      >
        {getMenuBtnContent(network.chainId)}
      </MenuButton>
      <MenuList borderRadius="15px">
        <Text py="7px" px="20px" color="gray">
          Select a network
        </Text>
        {Object.entries(NETWORKS).map(([chainId, chainInfo]) => (
          <MenuItem key={chainId} onClick={getHandler(Number(chainId))}>
            <NetworkLogo src={chainInfo.logo} />
            <Text>{chainInfo.name}</Text>
            <Spacer />
            {Number(chainId) === network.chainId && (
              <Box bg="green.400" w="8px" h="8px" rounded="full" />
            )}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default NetworkMenu;
