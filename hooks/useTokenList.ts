import { useState, useEffect } from "react";
import { useEthers, useTokenList as useTokens } from "@usedapp/core";
import { TokenInfo } from "@uniswap/token-lists";
import { useCovalent } from "./useCovalent";

const TOKEN_LISTS: { [chainID: string]: string } = {
  1: "https://gateway.ipfs.io/ipns/tokens.uniswap.org",
  10: "https://static.optimism.io/optimism.tokenlist.json",
  42: "https://gateway.ipfs.io/ipns/tokens.uniswap.org",
  137: "https://gateway.ipfs.io/ipns/tokens.uniswap.org",
  42161: "https://bridge.arbitrum.io/token-list-42161.json",
};

interface UserTokenData extends TokenInfo {
  balance: number;
}

export const useTokenList = () => {
  const { chainId } = useEthers();
  const { balances } = useCovalent();
  const [tokenList, setTokenList] = useState<UserTokenData[]>([]);
  const { tokens } = useTokens(TOKEN_LISTS[chainId]) || {};
  const getBalance = (address = "") => {
    if (balances) return balances[address.toLowerCase()] || 0;
  };

  useEffect(() => {
    if (tokens && balances && chainId) {
      const sortedTokens = tokens.sort((a, b) =>
        getBalance(a.address) > getBalance(b.address) ? -1 : 1
      );
      const userTokenList: UserTokenData[] = sortedTokens.map((token) => ({
        ...token,
        balance: getBalance(token.address),
      }));
      setTokenList(userTokenList);
    }
  }, [tokens, balances, chainId]);

  return tokenList;
};
