import {
  Avatar,
  Button,
  ButtonGroup,
  Spacer,
  HStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { SmallCloseIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { useWeb3React } from "@web3-react/core";
// import { Web3Provider } from "@ethersproject/providers";
// import { BigNumber } from "@ethersproject/bignumber";
import { useEagerConnect } from "../../hooks/useEagerConnect";
import { useInactiveListener } from "../../hooks/useInactiveListener";
import { injected, walletconnect, walletlink } from "../../connectors";
// import { translateChainId } from "../../utils";
import NetworkMenu from "./NetworkMenu";
import { MoreItems } from "./MoreItems";
// import { getEtherBalance } from "../../utils";
import { useEffect, useState } from "react";
import { formatEther } from "@ethersproject/units";
import { shortenAddress } from "../../utils";
import { getNativeToken } from "../../utils";
import { ethers } from "ethers";

export default function Wallet() {
  const context = useWeb3React();
  const { account, library, activate, chainId, deactivate } = context;
  const { isOpen, onOpen, onClose } = useDisclosure();

  // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
  const triedEager = useEagerConnect();

  const [etherBalance, setEtherBalance] = useState();

  const [ENSname, setENSname] = useState("");
  // const [ENSAvatar, setENSAvatar] = useState();

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

    const getENSname = async (address) => {
      try {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const name = await provider?.lookupAddress(address);
        if (name) {
          setENSname(name);
          // const resolver = await provider.getResolver(name);
          // const avatar = await resolver.getText("avatar");
          // setENSAvatar(avatar);
          // console.log(avatar);
        }
      } catch (error) {
        //It will send an error if the address is not registered on the ENS or the network is not supported
        console.log(error);
      }
    };

    getEtherBalance(account);
    getENSname(account);
  }, [account, library]);
  // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
  useInactiveListener(!triedEager);

  const Account = () => {
    // console.log("account", account);
    // console.log("chainId", chainId);
    if (!library) {
      return (
        <>
          <Button colorScheme="purple" onClick={onOpen}>
            Connect Wallet
          </Button>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Please select a wallet to connect to</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Button
                  width="100%"
                  height="55px"
                  colorScheme="yellow"
                  onClick={() => activate(injected)}
                >
                  <Avatar src="/metamask.jpeg" />
                  &nbsp;Metamask
                </Button>
                <br />
                <Button
                  width="100%"
                  height="55px"
                  colorScheme="teal"
                  onClick={() => activate(walletconnect)}
                >
                  <Avatar src="/walletconnect.png" />
                  &nbsp;WalletConnect
                </Button>
                <br />
                <Button
                  width="100%"
                  height="55px"
                  colorScheme="blue"
                  onClick={() => activate(walletlink)}
                >
                  <Avatar src="/walletlink.svg" />
                  &nbsp;Walletlink
                </Button>
              </ModalBody>

              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      );
    }
    return (
      <HStack spacing={-4}>
        {etherBalance ? (
          <Button
            isDisabled
            size="md"
            borderRadius="xl"
            pr="5"
            backgroundColor="purple.100"
            _hover={{
              bg: "purple.100",
            }}
            _active={{
              bg: "purple.100",
            }}
            _disabled={{
              bg: "purple.100",
              cursor: "default",
            }}
          >
            {Number(formatEther(etherBalance)).toFixed(5)}{" "}
            {getNativeToken(chainId)}
          </Button>
        ) : null}

        <Button
          colorScheme="purple"
          size="md"
          borderRadius="xl"
          margin-left="-20px"
          pr="5"
          color="black"
          backgroundColor="purple.100"
          _hover={{
            bg: "purple.100",
          }}
          _active={{
            bg: "purple.100",
          }}
          onClick={() => deactivate()}
        >
          {ENSname ? (
            <>
              <Avatar
                size="sm"
                name={ENSname}
                src={`https://metadata.ens.domains/mainnet/avatar/${ENSname}`}
              />
              &nbsp;{ENSname}
            </>
          ) : (
            shortenAddress(account)
          )}
          <SmallCloseIcon ml={1} color="blue.400" marginRight="-13px" />
        </Button>
      </HStack>
    );
  };

  // const Network = () => {
  //   {
  //     library && library.provider.isMetaMask && <NetworkMenu />;
  //   }
  // };

  return (
    <HStack spacing={4}>
      <Spacer />
      {library && library.provider.isMetaMask && <NetworkMenu />}
      <Account />
      <MoreItems />
    </HStack>
  );
}
