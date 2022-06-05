import { useState } from "react";
import { useEthers } from "@usedapp/core";
import WalletConnectProvider from "@walletconnect/web3-provider";
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";

export const useMetaMaskWallet = () => {
  const { activateBrowserWallet, isLoading, library } = useEthers();
  console.log({ library });
  return {
    connect: activateBrowserWallet,
    isLoading,
  };
};

export const useWalletConnectWallet = () => {
  const [isLoading, setLoading] = useState(false);
  const { activate } = useEthers();
  const connect = () => {
    const provider = new WalletConnectProvider({
      infuraId: process.env.NEXT_PUBLIC_INFURA_ID,
    });

    setLoading(true);
    provider
      .enable()
      .then(() => activate(provider))
      .then(() => setLoading(false))
      .catch((e) => {
        console.log("caught", e);
        setLoading(false);
      });
  };
  return {
    connect,
    isLoading,
  };
};

export const useCoinbaseWallet = () => {
  const [isLoading, setLoading] = useState(false);
  const { activate } = useEthers();
  const connect = () => {
    const APP_NAME = "Eth Gives";
    const DEFAULT_ETH_JSONRPC_URL = `https://mainnet.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_ID}`;
    const DEFAULT_CHAIN_ID = 1;

    // Initialize Coinbase Wallet SDK
    const coinbase = new CoinbaseWalletSDK({
      appName: APP_NAME,
      darkMode: false,
    });

    const provider = coinbase.makeWeb3Provider(
      DEFAULT_ETH_JSONRPC_URL,
      DEFAULT_CHAIN_ID
    );

    setLoading(true);
    provider
      .enable()
      .then(() => activate(provider))
      .then(() => setLoading(false))
      .catch((e) => {
        console.log("caught", e);
        setLoading(false);
      });
  };
  return {
    connect,
    isLoading,
  };
};
