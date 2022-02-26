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
  const env = process.env.NODE_ENV;
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
        DustSweeper is only supported on Mainnet at the moment. Switch to
        Mainnet
      </MenuButton>
    );
  };

  return (
    <Menu>
      {(env == "production" && chainId == 1) ||
      (env == "development" && chainId == 1337) ? (
        <MenuButton
          as={Button}
          // rightIcon={<ChevronDownIcon />}
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
    </Menu>
  );
};

export default NetworkMenu;
