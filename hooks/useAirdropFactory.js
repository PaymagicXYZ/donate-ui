import { useState, useEffect } from "react";
import { Contract } from "ethers";
import { getAirdropFactoryAddress } from "../utils/contracts";
import contractData from "../artifacts/contracts/AirdropFactory.sol/AirdropFactory.json";

export function useAirdropFactory(provider, chainId) {
  const [contract, setContract] = useState(null);
  const contractAddress = getAirdropFactoryAddress(chainId)

  useEffect(() => {
    if (provider) setContract(new Contract(contractAddress, contractData.abi, provider.getSigner()));
  }, [provider]);

  return contract;
}
