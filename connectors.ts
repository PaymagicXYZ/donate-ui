import { InjectedConnector } from "@web3-react/injected-connector";
import { NetworkConnector } from "@web3-react/network-connector";
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { WalletLinkConnector } from '@web3-react/walletlink-connector';
import { AbstractConnector } from '@web3-react/abstract-connector';

const RPC = {
  1: "https://eth-mainnet.alchemyapi.io/v2/kcJtCHa4cwFVzchsBeY30JBpXkuV4lzA",
  1337: "http://localhost:8545",
};

export const injected = new InjectedConnector({
  // supportedChainIds: [1, 1337],
});

export const network = new NetworkConnector({
  urls: RPC,
  defaultChainId: 1,
});

export const walletconnect = new WalletConnectConnector({
  rpc: {
    1: RPC[1],
  },
  bridge: "https://bridge.walletconnect.org",
  qrcode: true,
  // pollingInterval: 15000,
});

export const walletlink = new WalletLinkConnector({
  url: RPC[1],
  appName: "DustSweeper",
  appLogoUrl:
    "https://dustsweeper.xyz/logo-square.png",
});

export interface WalletInfo {
    connector?: AbstractConnector
    name: string
    iconName: string
    description: string
    href: string | null
    color: string
    primary?: true
    mobile?: true
    mobileOnly?: true
}