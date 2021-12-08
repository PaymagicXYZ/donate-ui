import {
  Button,
  ButtonGroup,
  Spacer,
  Menu,
  MenuList,
  MenuItem,
  MenuButton,
  Box,
  Flex,
  Text,
  HStack,
  IconButton,
} from "@chakra-ui/react";
import { SmallCloseIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { BigNumber } from "@ethersproject/bignumber";
import { useEagerConnect } from "../../hooks/useEagerConnect";
import { useInactiveListener } from "../../hooks/useInactiveListener";
import { injected } from "../../connectors";
import { translateChainId } from "../../utils";
import NetworkMenu from "./NetworkMenu";
// import { getEtherBalance } from "../../utils";
import { useEffect, useState } from "react";
import { formatEther } from "@ethersproject/units";
import { shortenAddress } from "../../utils";
import { getNativeToken } from "../../utils";
import { BsThreeDots } from "react-icons/bs";
import { BiInfoCircle } from "react-icons/bi";
import { SiTelegram, SiTwitter } from "react-icons/si";

export default function Wallet() {
  const context = useWeb3React();
  const { account, library, activate, chainId, deactivate } = context;

  // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
  const triedEager = useEagerConnect();

  const [etherBalance, setEtherBalance] = useState();
  // const userEthBalance = useETHBalances(account ? [account] : [])?.[
  //   account ?? ""
  // ];

  useEffect(() => {
    getNativeToken(chainId);
  }, [chainId]);

  useEffect(() => {
    const getEtherBalance = async (address) => {
      const balance = await library?.getBalance(address);
      if (balance) {
        setEtherBalance(balance);
      }
    };

    getEtherBalance(account);
  }, [account, library]);
  // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
  useInactiveListener(!triedEager);

  const Account = () => {
    console.log("account", account);
    if (!library) {
      return (
        <Button
          colorScheme="purple"
          onClick={() => activate(injected)}
        >
          Connect MetaMask
        </Button>
      );
    }

    return (
      <HStack spacing={-4}>
        {etherBalance ? (
           <Button
            isDisabled
            size='sm'
            borderRadius="xl"
            pr='5'
            backgroundColor='purple.100'
            _hover={{
              bg: 'purple.100',
            }}
            _active={{
              bg: 'purple.100',
            }}
            _disabled={{
              bg: 'purple.100',
              cursor: 'default',
            }}
          >
            {Number(formatEther(etherBalance)).toFixed(5)}{" "}
            {getNativeToken(chainId)}
          </Button>
        ) : null}
         <Button
          size="md"
          borderRadius="xl"
          backgroundColor='purple.100'
          borderColor='purple'
          _hover={{
            bg: 'purple.400',
          }}
          _active={{
            bg: 'purple.400',
          }}
          _disabled={{
            bg: 'purple.400',
            pointer: 'default',
          }}
          onClick={() => deactivate()}
          rightIcon={<SmallCloseIcon boxSize={5}/>}
        >
          {shortenAddress(account)}
        </Button>
      </HStack>



        
    );
  };

  // const Network = () => {
  //   {
  //     library && library.provider.isMetaMask && <NetworkMenu />;
  //   }
  // };

  const MoreItems = () => {

    return (
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label="More"
          icon={<BsThreeDots />}
          backgroundColor='purple.100'
          borderRadius="xl"
          direction="rtl"
          _hover={{
            bg: 'purple.400',
          }}
          _active={{
            bg: 'purple.400',
          }}
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
    <HStack spacing={4}>
      <Spacer />
      {library && library.provider.isMetaMask && <NetworkMenu />}
      <Account />
      <MoreItems />
    </HStack>
  );
}
