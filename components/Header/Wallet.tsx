import {
  Link,
  Button,
  Spacer,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  IconButton
} from "@chakra-ui/react";
import { CopyIcon } from "@chakra-ui/icons";
import { BsThreeDots } from "react-icons/bs";
import { BiInfoCircle } from "react-icons/bi";
import { SiTelegram, SiTwitter } from "react-icons/si";
import { MdDarkMode } from "react-icons/md";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";

import { useEagerConnect } from "../../hooks/useEagerConnect";
import { useInactiveListener } from "../../hooks/useInactiveListener";
import { injected } from "../../connectors";
import { translateChainId } from "../../utils";

export default function Wallet() {

  const context = useWeb3React();
  const { account, activate, chainId } = context;

  // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
  const triedEager = useEagerConnect();

  // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
  useInactiveListener(!triedEager);

  const Account = () => {
    if (account === null || account === undefined) {
      return (
        <Button
          colorScheme="purple"
          onClick={() => activate(injected)}
        >
          Connect Wallet
        </Button>
      );
    }

    return (
      <Button
        colorScheme="blue"
        variant="outline"
        onClick={() => navigator.clipboard.writeText(account)}
        borderRadius="xl"
      >
        {`${account.substring(0, 6)}...${account.substring(
          account.length - 4
        )}`}
        <CopyIcon ml={1} color="blue.400" />
      </Button>
    );
  };

  const Network = () => {
    if (!chainId) {
      return null;
    }

    return (
      <Button
        colorScheme="orange"
        variant="outline"
        ml={2}
        borderRadius="xl"
        >
        {translateChainId(chainId)}
      </Button>
    );
  };

  const MoreItems = () => {

    return (
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label="More"
          icon={<BsThreeDots />}
          backgroundColor='gray.200' 
          borderRadius="xl"
          direction="rtl"
        />
        <MenuList borderRadius="xl">
          <MenuItem
            as="a"
            href="https://www.paymagic.xyz"
            target="_blank"
            icon={<BiInfoCircle size="18"/>}
          >
            About
          </MenuItem>
          <MenuItem
            as="a"
            href="https://t.me/paymagic"
            target="_blank"
            icon={<SiTelegram size="18"/>}
          >
            Telegram
          </MenuItem>
          <MenuItem
            as="a"
            href="https://twitter.com/paymagic_"
            target="_blank"
            icon={<SiTwitter size="18"/>}
          >
            Twitter
          </MenuItem>
        </MenuList>
      </Menu>
    );
  };

  return (
    <>
      <Spacer />
      <Account />
      <Network />
      <MoreItems />
    </>
  )
}