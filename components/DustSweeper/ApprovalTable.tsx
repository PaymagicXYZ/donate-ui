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
import { DUSTSWEEPER_ADDRESS } from '../../utils/constants'


export default function TransactionTable(props) {
  const { library, account, chainId } = useWeb3React();
  const [loading, setLoading] = useState(true);
  const [approvalList, setApprovalList] = useState([]);

  useEffect(() => {
    let toggle = localStorage.getItem("toggle")

    console.log('toggle')
    console.log(toggle)

    if(toggle === 'true') {
      console.log('values')
      setApprovalList([])   
      localStorage.setItem("toggle", 'false')   
    } else {
      console.log('no values')
      setApprovalList([])  
      localStorage.setItem("toggle", 'true')
    }

    setLoading(false)
  },[])


  // useEffect(() => {

  //   async function getData() {
  //     console.log('Running getData')
  //     let tmpApprovalList = []
  //     let erc20 = new ethers.Contract(
  //       tokenData.tokens[0].address,
  //       ERC20Contract.abi,
  //       library
  //     );

  //     for (let i = 0; i < tokenData.length; i++) {
  //       console.log(tokenData.tokens[i].address)
  //       erc20 = erc20.attach(tokenData.tokens[i].address)

  //       console.log(erc20)
  //       // event Approval(address indexed owner, address indexed spender, uint256 value);
  //       const filterSpender = erc20.filters.Approval(null, DUSTSWEEPER_ADDRESS);
  //       // const filterOwner = erc20.filters.Approval('0xe549b42e6df97e02f8efc8bc4e21794b5d7bfb59');
  //       // const filterOwner = erc20.filters.Approval();

  //       const logsFrom = await erc20.queryFilter(filterSpender, -5000, "latest");

  //       for (let j = 0; j < logsFrom.length; j++) {
  //         const owner = _.get(logsFrom[j], 'args.owner')
  //         const spender = _.get(logsFrom[j], 'args.spender')
  //         // const spender = DUSTSWEEPER_ADDRESS

  //         try {
  //           const allowance = await erc20.allowance(owner, spender)

  //           if(allowance.gt('0')) {
  //             let approval = logsFrom[j]
  //             const symbol = await erc20.symbol()
  //             const decimals = await erc20.decimals()

  //             console.log(allowance)
  //             console.log(decimals)
  //             approval.owner = owner
  //             approval.spender = spender
  //             approval.symbol = symbol
  //             approval.allowance = allowance
  //             approval.decimals = decimals
  //             tmpApprovalList.push(approval)
  //           }
  //         } catch (err) {
  //           console.error(err);
  //         }
  //       }
  //     }
  //     setApprovalList(tmpApprovalList)
  //     setLoading(false)
  //   }

  //   if(library) {
  //     getData();      
  //   }
  // }, [library]);


console.log(approvalList)


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
