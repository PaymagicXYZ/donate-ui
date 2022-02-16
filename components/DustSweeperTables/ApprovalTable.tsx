import { useState, useMemo, useEffect } from "react";
import _ from 'lodash';
import { ethers } from "ethers";
import { Box, Center } from "@chakra-ui/react";

import { ApprovalTableContent } from "./ApprovalTableContent";
import { WalletChecker } from "../../components/WalletChecker";
import { useCovalent } from "../../hooks/useCovalent";
import { useWeb3React } from "@web3-react/core";
import ERC20Contract from "../../artifacts/contracts/TestERC20.sol/TestERC20.json";
import * as tokenData from './tokens.json'


export default function TransactionTable() {
  const { library, account, chainId } = useWeb3React();
  const [loading, setLoading] = useState(true);
  const [approvalList, setApprovalList] = useState([]);

  useEffect(() => {

    async function getData() {
      let tmpApprovalList = []
      let erc20 = new ethers.Contract(
        tokenData.tokens[0].address,
        ERC20Contract.abi,
        library
      );

      for (let i = 0; i < 5; i++) {
        erc20 = erc20.attach(tokenData.tokens[i].address)

        console.log(erc20)
        // event Approval(address indexed owner, address indexed spender, uint256 value);
        // const filterSpender = erc20.filters.Approval(null, '0x869eC00FA1DC112917c781942Cc01c68521c415e');
        // const filterOwner = erc20.filters.Approval('0xe549b42e6df97e02f8efc8bc4e21794b5d7bfb59');
        const filterOwner = erc20.filters.Approval();

        const logsFrom = await erc20.queryFilter(filterOwner, -5000, "latest");

        for (let j = 0; j < 5; j++) {
          const owner = _.get(logsFrom[j], 'args.owner')
          const spender = _.get(logsFrom[j], 'args.spender')
          // const spender = DUSTSWEEPER_ADDRESS

          try {
            const allowance = await erc20.allowance(owner, spender)

            if(allowance.gt('0')) {
              let approval = logsFrom[j]
              const symbol = await erc20.symbol()
              const decimals = await erc20.decimals()

              console.log(allowance)
              console.log(decimals)
              approval.owner = owner
              approval.spender = spender
              approval.symbol = symbol
              approval.decimals = decimals
              tmpApprovalList.push(approval)
            }
          } catch (err) {
            console.error(err);
          }
        }
      }
      setApprovalList(tmpApprovalList)
      setLoading(false)
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
// console.log(approvalList)


  return (
    <WalletChecker loading={loading} account={account}>
      <Center>
        <Box py={{ base: "2", md: "4" }}>
          <ApprovalTableContent
            approvalList={approvalList}
          />
        </Box>
      </Center>
    </WalletChecker>

  );
}
