import { ethers, BigNumber } from "ethers";
import { useEffect, useState } from "react";
import { useContract } from "./useContract";
import { useAirdropFactory } from "./useAirdropFactory";
import { getMerkleData, createMerkleTree } from "../utils";
import contractAbi from "../artifacts/contracts/MerkleDistributor.sol/MerkleDistributor.json";

export function useMerkleDistributor(library, account, chainId, contractAddress, recipientAddress) {
  const [data, setData] = useState({})
  const airdropFactory = useAirdropFactory(library, chainId);
  
  contractAddress = '0x08a9e551e14bfd1c94e5e3a3f669a458d3f5e403'

  const contract = useContract(
    library,
    contractAbi,
    contractAddress
  )

  useEffect(() => {
    async function getData() {
      const airdropIndex = 0
      const cid = await airdropFactory.getAirdropCID(
        BigNumber.from(airdropIndex)
      );
      const merkleData = await getMerkleData(cid);
      const tree = createMerkleTree(merkleData.recipients);

      setData({
        address: contractAddress,
        cid: cid,
        airdropIndex: airdropIndex,
  	    data: merkleData,
  	    tree: tree,
  	    contract: contract
      })
    }

    if(!_.isNull(airdropFactory)) {
      getData();
    }
  },[contractAddress, recipientAddress]);

  return data;
}
