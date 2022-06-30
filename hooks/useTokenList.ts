import { useState, useEffect } from "react";
import { useEthers, useTokenList as useTokens } from "@usedapp/core";
import { utils } from "ethers";
import { TokenInfo } from "@uniswap/token-lists";
import { useCovalent } from "./useCovalent";
import Fuse from "fuse.js";
import { NATIVE_CURRENCY_BY_CHAIN, TOKEN_LISTS } from "../utils/constants";

export interface UserTokenData extends TokenInfo {
  balance: number;
  price?: number;
}

export const useTokenList = () => {
  const { chainId } = useEthers();
  const { balances } = useCovalent();
  const [tokenList, setTokenList] = useState<UserTokenData[]>([]);
  const { tokens } = useTokens(TOKEN_LISTS[chainId || 1]) || {};
  const nativeCurrency = NATIVE_CURRENCY_BY_CHAIN[chainId];

  useEffect(() => {
    if (tokens && balances && chainId) {
      const balancesData = balances?.reduce((memo, tokenData) => {
        const balance = Number(
          utils.formatUnits(tokenData.balance, tokenData.contract_decimals)
        );
        memo[tokenData.contract_address.toLowerCase()] = balance;
        return memo;
      }, {});

      const tokensWithBalance = tokens.map((token) => ({
        ...token,
        balance: balancesData[token.address.toLowerCase()] || 0,
      }));

      const sortedTokens = tokensWithBalance.sort((a, b) =>
        a.balance > b.balance ? -1 : 1
      );
      const nativeCurrencyWithBalance = {
        ...nativeCurrency,
        balance: balancesData[nativeCurrency.address.toLowerCase()] || 0,
      };

      setTokenList([nativeCurrencyWithBalance, ...sortedTokens]);
    }
  }, [tokens, balances, chainId]);

  return tokenList;
};

interface FilteredToken {
  item: UserTokenData;
  refIndex: number;
}
export const useFilteredTokens = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTokens, setFilteredTokens] = useState<FilteredToken[]>([]);
  const tokens = useTokenList();
  const fuse = new Fuse(tokens, {
    keys: ["name", "address", "symbol"],
  });

  useEffect(() => {
    const formattedTokens = tokens.map((token, i) => ({
      item: token,
      refIndex: i,
    }));
    setFilteredTokens(formattedTokens);
    console.log("resetting");
  }, [tokens]);

  useEffect(() => {
    const searchResults = fuse.search(searchTerm);
    setFilteredTokens(searchResults);
    console.log("updating ", searchResults);
  }, [searchTerm]);

  return {
    setSearchTerm,
    filteredTokens,
  };
};
