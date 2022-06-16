import { useEffect, useState } from "react";
import { Spinner, useDisclosure } from "@chakra-ui/react";
import metamaskLogo from "../../assets/metamask_logo.png";
import walletconnectLogo from "../../assets/walletconnect_logo.png";
import coinbaseLogo from "../../assets/coinbasewallet_logo.png";
import trezorLogo from "../../assets/trezor_logo.png";
import {
  useMetaMaskWallet,
  useWalletConnectWallet,
  useCoinbaseWallet,
} from "../../hooks";
import Button from "../Button";
import ModalList from "../ModalList";
import { StaticImageData } from "next/image";

interface WalletConnectorInfo {
  name: string;
  logo: StaticImageData;
  onClick: () => void;
  isLoading: boolean;
}

export default function ConnectWallet() {
  const { onOpen, isOpen, onClose } = useDisclosure();
  const [selectedWallet, setSelectedWallet] = useState<string>();

  const { connect: connectMetaMask, isLoading: isMetaMaskLoading } =
    useMetaMaskWallet();
  const { connect: connectWalletConnect, isLoading: isWalletConnectLoading } =
    useWalletConnectWallet();
  const { connect: connectCoinbase, isLoading: isCoinbaseLoading } =
    useCoinbaseWallet();

  const getAdornment = (isLoading: boolean, name: string) =>
    isLoading && selectedWallet === name ? <Spinner /> : null;

  const walletConnectors: WalletConnectorInfo[] = [
    {
      name: "MetaMask",
      logo: metamaskLogo,
      isLoading: isMetaMaskLoading,
      onClick: connectMetaMask,
    },
    {
      name: "WalletConnect",
      logo: walletconnectLogo,
      isLoading: isWalletConnectLoading,
      onClick: connectWalletConnect,
    },
    {
      name: "Coinbase Wallet",
      logo: coinbaseLogo,
      isLoading: isCoinbaseLoading,
      onClick: connectCoinbase,
    },
    {
      name: "Trezor",
      logo: trezorLogo,
      isLoading: false,
      onClick: () =>
        alert("this one is going to take some more time to set up"),
    },
  ];

  const walletOptions = walletConnectors.map((connector) => ({
    ...connector,
    adornment: getAdornment(connector.isLoading, connector.name),
    onClick: () => {
      setSelectedWallet(connector.name);
      connector.onClick();
    },
  }));

  return (
    <>
      <Button onClick={onOpen} borderRadius="accountBtn" fontWeight={700}>
        Connect Wallet
      </Button>
      <ModalList
        title="Connect Wallet"
        isOpen={isOpen}
        onClose={onClose}
        items={walletOptions}
      />
    </>
  );
}
