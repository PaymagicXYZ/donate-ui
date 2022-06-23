import { useState, useEffect } from "react";
import { useEthers, useTokenList as useTokens } from "@usedapp/core";
import { utils } from "ethers";
import { TokenInfo } from "@uniswap/token-lists";
import { useCovalent } from "./useCovalent";
import Fuse from "fuse.js";
import { TOKEN_LISTS } from "../utils/constants";

export interface UserTokenData extends TokenInfo {
  balance: number;
  price: number;
}

export const useTokenList = () => {
  const { chainId } = useEthers();
  const { balances } = useCovalent();
  const [tokenList, setTokenList] = useState<UserTokenData[]>([]);
  const { tokens } = useTokens(TOKEN_LISTS[chainId]) || {};

  useEffect(() => {
    if (tokens && balances && chainId) {
      const addressesWithBalance = {};
      const tokensWithBalance = [];
      for (const tokenData of balances) {
        const balance = Number(
          utils.formatUnits(tokenData.balance, tokenData.contract_decimals)
        );
        addressesWithBalance[tokenData.contract_address] = true;
        tokensWithBalance.push({
          address: tokenData.contract_address,
          name: tokenData.contract_name,
          decimals: tokenData.contract_decimals,
          symbol: tokenData.contract_ticker_symbol,
          logoURI: tokenData.logo_url,
          chainId,
          balance,
        });
      }
      const tokensWithNoBalance = tokens.reduce((memo, curr) => {
        if (addressesWithBalance && !addressesWithBalance[curr.address]) {
          return [...memo, { ...curr, balance: 0, price: 0 }];
        }
        return memo;
      }, []);

      const userTokenList = tokensWithBalance.concat(tokensWithNoBalance);
      setTokenList(userTokenList);
    }
  }, [tokens, balances, chainId]);

  return tokenList;
};


interface FilteredToken {
  item: UserTokenData;
  refIndex: number
}
export const useFilteredTokens = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTokens, setFilteredTokens] = useState<FilteredToken[]>([]);
  const tokens = useTokenList();
  const fuse = new Fuse(tokens, {
    keys: ["name", "address", "symbol"],
  });

  useEffect(() => {
    const formattedTokens = tokens.map((token, i) => ({ item: token, refIndex: i }))
    setFilteredTokens(formattedTokens)
    console.log('resetting')
  }, [tokens])

  useEffect(() => {
    const searchResults = fuse.search(searchTerm)
    setFilteredTokens(searchResults);
    console.log('updating ', searchResults)
  }, [searchTerm])

  return {
    setSearchTerm,
    filteredTokens
  }
}