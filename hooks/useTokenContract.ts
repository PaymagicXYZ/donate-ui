import { useState, useEffect } from "react";
import { Contract, utils } from "ethers";
import {
  useContractFunction,
  useEthers,
  Call,
  useCalls,
  useCall,
} from "@usedapp/core";
import ERC20Contract from "../artifacts/@openzeppelin/contracts/token/ERC20/ERC20.sol/ERC20.json";
import { TokenInfo } from "@uniswap/token-lists";
import { UserTokenData } from "./useTokenList";

export const useTokenContract = (address: string) => {
  const [tokenContract, setTokenContract] = useState<Contract>(null);
  useEffect(() => {
    if (address) {
      const erc20Contract = new Contract(address, ERC20Contract.abi);
      setTokenContract(erc20Contract);
    }
  }, [address]);
  return tokenContract;
};

export const useTokenFunctions = (address: string) => {
  const tokenContract = useTokenContract(address);
  const [tokenFunctions, setTokenFunctions] = useState({
    approve: null,
    transfer: null,
  });
  if (tokenContract) {
    const { send: approve } = useContractFunction(tokenContract, "approve");
    const { send: transfer } = useContractFunction(tokenContract, "transfer");
    useEffect(() => {
      if (address) {
        setTokenFunctions({
          approve,
          transfer,
        });
      }
    }, [address]);
  }
  return tokenFunctions;
};

export const useCustomToken = (tokenAddress: string) => {
  const { account, chainId } = useEthers();
  const [args, setArgs] = useState([]);
  const [name, symbol, decimals, totalSupply, balance] = useCalls(args);
  const formattedBalance =
    balance && decimals
      ? Number(utils.formatUnits(balance.value[0], decimals?.value[0]))
      : null;

  useEffect(() => {
    if (utils.isAddress(tokenAddress)) {
      const partialCall = {
        contract: new Contract(tokenAddress, ERC20Contract.abi),
        address: tokenAddress || "",
        args: [],
      };
      const newArgs = ["name", "symbol", "decimals", "totalSupply"].map(
        (method): Call => ({ ...partialCall, method })
      );
      newArgs.push({ ...partialCall, method: "balanceOf", args: [account] });
      setArgs(newArgs);
    } else {
      setArgs([]);
    }
  }, [tokenAddress]);

  if (!name && !symbol && !decimals && !totalSupply) {
    return undefined;
  }
  const token: UserTokenData = {
    name: name?.value[0] ?? "",
    symbol: symbol?.value[0] ?? "",
    decimals: decimals?.value[0],
    balance: formattedBalance,
    address: tokenAddress,
    chainId,
  };
  return token;
};
