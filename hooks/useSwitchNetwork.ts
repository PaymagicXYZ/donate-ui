import { useState } from "react";
import { useConfig, useEthers } from "@usedapp/core";

export const useSwitchNetwork = () => {
  const [isLoading, setLoading] = useState(false);
  const { library } = useEthers();
  const { networks } = useConfig();
  const switchNetwork = async (chainId: number) => {
    if (!library) {
      throw new Error("Provider not connected.");
    }
    setLoading(true);
    try {
      await library.send("wallet_switchEthereumChain", [
        { chainId: `0x${chainId.toString(16)}` },
      ]);
    } catch (error: any) {
      const errChainNotAddedYet = 4902; // Metamask error code
      if (error.code === errChainNotAddedYet) {
        const chain = networks?.find((chain) => chain.chainId === chainId);
        if (chain?.rpcUrl) {
          await library.send("wallet_addEthereumChain", [
            {
              chainId: `0x${chain.chainId.toString(16)}`,
              chainName: chain.chainName,
              rpcUrls: [chain.rpcUrl],
              blockExplorerUrls: chain.blockExplorerUrl
                ? [chain.blockExplorerUrl]
                : undefined,
              nativeCurrency: chain.nativeCurrency && [chain.nativeCurrency],
            },
          ]);
        }
      }
    }
    setLoading(false);
  };
  return {
    switchNetwork,
    isLoading,
  };
};
