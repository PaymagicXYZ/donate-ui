import { useMemo, useEffect } from "react";
import _ from 'lodash';
import { ethers } from "ethers";
import { Box } from "@chakra-ui/react";

import { ApprovalTableContent } from "./ApprovalTableContent";
import { cols } from "./_data";

import { useCovalent } from "../../hooks/useCovalent";
import { useWeb3React } from "@web3-react/core";
import { CovalentNetworkForID } from "../../utils/constants";
import ERC20Contract from "../../artifacts/contracts/TestERC20.sol/TestERC20.json";
import * as tokenData from './tokens.json'


export default function TransactionTable() {
  const { library, account, chainId } = useWeb3React();

  useEffect(() => {

    async function getData() {
      let erc20 = new ethers.Contract(
        tokenData.tokens[0].address,
        ERC20Contract.abi,
        library
      );


      for (let i = 0; i < 10; i++) {
        erc20 = erc20.attach(tokenData.tokens[i].address)

        console.log(erc20)
        // event Approval(address indexed owner, address indexed spender, uint256 value);
        // const filterSpender = erc20.filters.Approval(null, '0x869eC00FA1DC112917c781942Cc01c68521c415e');
        const filterOwner = erc20.filters.Approval('0xe549b42e6df97e02f8efc8bc4e21794b5d7bfb59');

        const logsFrom = await erc20.queryFilter(filterOwner, -5000, "latest");

        console.log(logsFrom)
      }
    }

    if(library) {
      getData();      
    }
  }, [library]);






  const fetchCovalentData = useCovalent(
    '0x869eC00FA1DC112917c781942Cc01c68521c415e',
    // account,
    1
  );
  const balances = useMemo(() => {
  	const items = _.get(fetchCovalentData, 'balance.data.items', [])
  	const validBalances = _.filter(
      items, (i) => {
        return i.quote > 5;
      }
    );

    return validBalances;
  }, [fetchCovalentData]);

// console.log(balances)


  return (
    <Box py={{ base: "2", md: "4" }}>
      <ApprovalTableContent
        walletData={balances}
      />
    </Box>
  );
}
