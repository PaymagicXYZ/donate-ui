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
import { SUPPORTED_NETWORKS } from "../../utils/constants";

import Image, { ImageProps } from "next/image";
import Select from "../Select";

const NetworkLogo = (props: ImageProps) => (
  <Flex style={{ marginRight: 7 }}>
    <Image width={20} height={20} {...props} />
  </Flex>
);

const getMenuBtnContent = (chainId: number) => {
  const chain = SUPPORTED_NETWORKS[chainId];
  return (
    chain && (
      <Flex alignItems="center">
        <NetworkLogo src={chain.logo} alt={chain.name} />
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
  const networkName = SUPPORTED_NETWORKS[network.chainId]?.name;
  const networkLogoURI = SUPPORTED_NETWORKS[network.chainId]?.logo.src;
  return (
    <Select
      onClick={() => alert("open network menu")}
      value={networkName}
      logoURI={networkLogoURI}
      placeHolderText="Pick a network"
    />
    // <Menu>
    //   <MenuButton
    //     as={Button}
    //     bg="purple.100"
    //     color="black"
    //     borderRadius="15px"
    //     py="3"
    //     w="full"
    //   >
    //     {getMenuBtnContent(network.chainId)}
    //   </MenuButton>
    //   <MenuList borderRadius="15px">
    //     <Text py="7px" px="20px" color="gray">
    //       Select a network
    //     </Text>
    //     {Object.entries(SUPPORTED_NETWORKS).map(([chainId, chainInfo]) => (
    //       <MenuItem key={chainId} onClick={getHandler(Number(chainId))}>
    //         <NetworkLogo src={chainInfo.logo} />
    //         <Text>{chainInfo.name}</Text>
    //         <Spacer />
    //         {Number(chainId) === network.chainId && (
    //           <Box bg="green.400" w="8px" h="8px" rounded="full" />
    //         )}
    //       </MenuItem>
    //     ))}
    //   </MenuList>
    // </Menu>
  );
};

export default NetworkMenu;
