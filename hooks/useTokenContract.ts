import { useState, useEffect } from "react";
import { Contract } from "ethers";
import { useContractFunction } from "@usedapp/core";
import ERC20Contract from "../artifacts/@openzeppelin/contracts/token/ERC20/ERC20.sol/ERC20.json";

export const useTokenContract = (address: string) => {
  const [tokenContract, setTokenContract] = useState(null);
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
