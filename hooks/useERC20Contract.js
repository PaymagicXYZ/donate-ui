import { useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { Contract } from "ethers";

import ERC20Contract from "../artifacts/@openzeppelin/contracts/token/ERC20/ERC20.sol/ERC20.json";

export function useERC20Contract() {
  const { account, library } = useWeb3React();

  const [contract, setContract] = useState();
  const [address, setAddress] = useState();

  useEffect(() => {
    if (account && library && !contract && address) {
      const signer = library.getSigner(account);
      setContract(new Contract(address, ERC20Contract.abi, signer));
    }
  }, [account, library, contract, address]);

  return [contract, setAddress];
}
