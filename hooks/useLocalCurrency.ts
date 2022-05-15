import { useState, useEffect } from "react";
import { useEthers } from "@usedapp/core";
import { formatEther } from "@ethersproject/units";
import ethLogo from "../components/NetworkSwitch/assets/eth_logo.png";
import polygonLogo from "../components/NetworkSwitch/assets/polygon_logo.png";
import { StaticImageData } from "next/image";

interface LocalCurrencyData {
  symbol: string;
  name: string;
  balance: number;
  logoURI: string;
  decimals: number;
}

export const useLocalCurrency = () => {
  const [localCurrency, setLocalCurrency] = useState<LocalCurrencyData>({
    symbol: "",
    name: "",
    balance: 0,
    logoURI: "",
    decimals: 18,
  });
  const { account, library, chainId } = useEthers();

  const getCurrencyData = async () => {
    const balance = await library.getBalance(account);
    const isPolygon = [137, 8001].includes(chainId);
    const symbol = isPolygon ? "MATIC" : "ETH";
    const name = isPolygon ? "Matic" : "Ether";
    const logoURI = isPolygon ? polygonLogo.src : ethLogo.src;
    setLocalCurrency({
      symbol,
      name,
      balance: Number(formatEther(balance)),
      logoURI,
      decimals: 18,
    });
  };

  useEffect(() => {
    if (account && chainId && library) getCurrencyData();
  }, [account, chainId]);

  return localCurrency;
};
