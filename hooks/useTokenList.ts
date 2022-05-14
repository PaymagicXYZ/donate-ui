import { useState, useEffect } from "react";
import { useTokenList as useTokens } from "@usedapp/core";
import { TokenInfo } from "@uniswap/token-lists";
import { useCovalent } from "./useCovalent";

const UNISWAP_DEFAULT_TOKEN_LIST_URI =
  "https://gateway.ipfs.io/ipns/tokens.uniswap.org";

interface UserTokenData extends TokenInfo {
  balance: number;
}

export const useTokenList = () => {
  const { balances } = useCovalent();
  const [tokenList, setTokenList] = useState<UserTokenData[]>([]);
  const { tokens } = useTokens(UNISWAP_DEFAULT_TOKEN_LIST_URI) || {};
  const getBalance = (address = "") => {
    if (balances) return balances[address.toLowerCase()] || 0;
  };

  useEffect(() => {
    if (tokens && balances) {
      const sortedTokens = tokens.sort((a, b) =>
        getBalance(a.address) > getBalance(b.address) ? -1 : 1
      );
      const userTokenList: UserTokenData[] = sortedTokens.map((token) => ({
        ...token,
        balance: getBalance(token.address),
      }));
      setTokenList(userTokenList);
    }
  }, [tokens, balances]);

  return tokenList;
};
