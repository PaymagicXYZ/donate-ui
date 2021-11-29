import { ethers } from "ethers";
import { useEffect, useState } from "react";
// import DisperseContract from "../artifacts/contracts/Disperse.sol/Disperse.json";

// const getProvider = () => window.ethereum || new ethers.providers.
// const MATIC_CONTRACT_ADDRESS = "0xb288Ffd7926CdabE672be0E9AE38Bb358d415400";
// const contractAddress = MATIC_CONTRACT_ADDRESS;

// const provider = new ethers.providers.Web3Provider();

export function useContract(provider, contractJSON, contractAddress) {
  const [contractInstance, setContractInstance] = useState();
  useEffect(() => {
    if (provider) {
      const signer = provider.getSigner();
      const _contract = new ethers.Contract(
        contractAddress,
        contractJSON.abi,
        provider
      );
      const contract = _contract.connect(signer);
      setContractInstance(contract);
    }
  }, [provider, contractJSON, contractAddress]);
  return contractInstance;
};
