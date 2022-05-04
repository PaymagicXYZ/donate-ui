import { useState, useEffect } from "react";
import { useTokenList as useTokens } from "@usedapp/core";
import { TokenInfo } from "@uniswap/token-lists";

const UNISWAP_DEFAULT_TOKEN_LIST_URI =
  "https://gateway.ipfs.io/ipns/tokens.uniswap.org";

export const useTokenList = () => {
  const [tokenList, setTokenList] = useState<TokenInfo[]>([]);
  const { tokens } = useTokens(UNISWAP_DEFAULT_TOKEN_LIST_URI) || {};

  useEffect(() => {
    if (tokens) setTokenList(tokens);
  }, [tokens]);

  return tokenList;
};
