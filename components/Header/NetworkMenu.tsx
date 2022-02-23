import {
  Button,
  Spacer,
  Menu,
  MenuList,
  MenuItem,
  MenuButton,
  MenuGroup,
  MenuOptionGroup,
  MenuItemOption,
  MenuDivider,
  Image,
  Flex,
} from "@chakra-ui/react";
import { SmallCloseIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { useWeb3React } from "@web3-react/core";
import { translateChainId } from "../../utils";
import { switchToNetwork } from "../../utils";

const NetworkMenu = () => {
  const context = useWeb3React();
  const { account, activate, chainId, deactivate, library } = context;

  if (!chainId) return null;

  const WrongNetworkButton = () => {
    return (
      <MenuButton
        as={Button}
        colorScheme="red"
        onClick={() => switchToNetwork(library, 1)}
      >
        Wrong Network. Switch to Mainnet
      </MenuButton>
    );
  };

  return (
    <Menu>
      {chainId == 1 ? (
        <MenuButton
          as={Button}
          borderRadius="xl"
          backgroundColor="purple.100"
          _hover={{
            bg: "purple.400",
          }}
          _active={{
            bg: "purple.400",
          }}
        >
          {translateChainId(chainId)}
        </MenuButton>
      ) : (
        <WrongNetworkButton />
      )}
      {/* <MenuList minWidth="240px">
        <MenuOptionGroup
          // defaultValue="asc"
          title="Select a network"
          // type="radio"
        >
          <MenuItemOption
            value="ethereum"
            onClick={() => switchNetwork(library, 1337)}
          >
            <Flex>
              <Image
                boxSize="20px"
                // borderRadius="full"
                src="/ethereum-logo.png"
                alt="ethereum-logo"
                mr="5px"
              />
              Ethereum
            </Flex>
          </MenuItemOption> */}

      {/* </MenuOptionGroup> */}
      {/* </MenuList> */}
    </Menu>
    // <Menu>
    //   <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
    //     {translateChainId(chainId)}
    //   </MenuButton>

    //   {chainId == 1 ? (
    //     <MenuList>
    //       <MenuItem onClick={() => switchNetwork(library, 137)}>
    //         {translateChainId(137)}
    //       </MenuItem>
    //       <MenuItem onClick={() => switchNetwork(library, 42)}>
    //         {translateChainId(42)}
    //       </MenuItem>
    //     </MenuList>
    //   ) : null}

    //   {chainId == 42 ? (
    //     <MenuList>
    //       <MenuItem onClick={() => switchNetwork(library, 1)}>
    //         {translateChainId(1)}
    //       </MenuItem>
    //       <MenuItem onClick={() => switchNetwork(library, 137)}>
    //         {translateChainId(137)}
    //       </MenuItem>
    //     </MenuList>
    //   ) : null}
    //   {chainId == 137 ? (
    //     <MenuList>
    //       <MenuItem onClick={() => switchNetwork(library, 1)}>
    //         {translateChainId(1)}
    //       </MenuItem>
    //       <MenuItem onClick={() => switchNetwork(library, 42)}>
    //         {translateChainId(42)}
    //       </MenuItem>
    //     </MenuList>
    //   ) : null}
    // </Menu>
  );
};

export default NetworkMenu;
