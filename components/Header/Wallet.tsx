import {
  Button,
  Spacer,
  Menu,
  MenuList,
  MenuItem,
  MenuButton,
  Box,
  Flex,
  Text,
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
import { ethers } from "ethers";

export default function Wallet() {
  const context = useWeb3React();
  const { account, library, activate, chainId, deactivate } = context;

  // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
  const triedEager = useEagerConnect();

  const [etherBalance, setEtherBalance] = useState();

  const [ENSname, setENSName] = useState();

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

    const getENSName = async (address) => {
      try {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const name = await provider?.lookupAddress(address);
        if (name) {
          setENSName(name);
        }
      } catch (error) {
        //It will send an error if the address is not registered on the ENS or the network is not supported
        console.log(error);
      }
    };

    getEtherBalance(account);
    getENSName(account);
  }, [account, library]);
  // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
  useInactiveListener(!triedEager);

  const Account = () => {
    console.log("account", account);
    if (!library) {
      return (
        <Button
          colorScheme="red"
          variant="outline"
          onClick={() => activate(injected)}
        >
          Connect MetaMask
        </Button>
      );
    }

    return (
      <Flex align="center">
        {etherBalance ? (
          <Box
            rounded="md"
            bg="purple"
            w="160px"
            mx="-10px"
            h="40px"
            justifyContent="flex-start"
          >
            <Text color="white" fontSize="xl" mt="5px" ml="10px">
              {Number(formatEther(etherBalance)).toFixed(5)}{" "}
              {getNativeToken(chainId)}
            </Text>
          </Box>
        ) : null}

        <Button colorScheme="purple" onClick={() => deactivate()}>
          {ENSname ? ENSname : shortenAddress(account)}
          <SmallCloseIcon ml={1} color="blue.400" />
        </Button>
      </Flex>
    );
  };

  // const Network = () => {
  //   {
  //     library && library.provider.isMetaMask && <NetworkMenu />;
  //   }
  // };

  return (
    <>
      <Spacer />
      {library && library.provider.isMetaMask && <NetworkMenu />}
      <Account />
    </>
  );
}
