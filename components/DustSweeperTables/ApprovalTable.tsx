import { useMemo } from "react";
import _ from 'lodash';
import { Box } from "@chakra-ui/react";

import { ApprovalTableContent } from "./ApprovalTableContent";
import { cols } from "./_data";

import { useCovalent } from "../../hooks/useCovalent";
import { useWeb3React } from "@web3-react/core";
import { CovalentNetworkForID } from "../../utils/constants";



export default function TransactionTable() {
  const { library, account, chainId } = useWeb3React();
  let props = {
    chain: chainId,
    accountAddress: '0x869eC00FA1DC112917c781942Cc01c68521c415e'
  }

  // const fetchCovalentData = {loading: false}
  const fetchCovalentData = useCovalent(
    '0x869eC00FA1DC112917c781942Cc01c68521c415e',
    // account,
    chainId
  );
  const covalentData = useMemo(() => {
    return fetchCovalentData;
  }, [fetchCovalentData]);



  return (
    <Box py={{ base: "2", md: "4" }}>
      <ApprovalTableContent
        walletData={_.get(covalentData, 'balance.data.items', [])}
      />
    </Box>
  );
}
