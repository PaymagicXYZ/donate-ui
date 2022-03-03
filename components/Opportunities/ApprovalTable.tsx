import { useState, useMemo, useEffect } from "react";
import _ from "lodash";
import { ethers } from "ethers";
import { Box, Center, Spinner } from "@chakra-ui/react";

import { ApprovalTableContent } from "./ApprovalTableContent";

import { getApproval } from "../../hooks/useCovalent";
export default function TransactionTable(props) {
  const [loading, setLoading] = useState(true);
  const [approvalList, setApprovalList] = useState([]);
  async function getApprovals() {
    const approvals = await getApproval();
    const closedOrder = approvals.data.items.filter(
      (item) => item.decoded.params[2].value == 0
    );
    const filteredApprovals = approvals.data.items
      .filter((item) => item.decoded.params[2].value != 0)
      .reverse()
      .map((e) => {
        return {
          balance: ethers.utils.formatUnits(
            e.decoded.params[2].value,
            e.sender_contract_decimals
          ),
          symbol: [e.sender_contract_ticker_symbol, e.sender_logo_url],
          maker: e.decoded.params[0].value,
          time: e.block_signed_at,
          tx: e.tx_hash,
        };
      });
    setApprovalList(filteredApprovals);
    setLoading(false);
  }
  useEffect(() => {
    getApprovals();
  }, []);

  return (
    <Center>
      {loading ? (
        <Spinner size="xl" />
      ) : (
        <Box py={{ base: "2", md: "4" }}>
          {console.log(approvalList)}
          <ApprovalTableContent approvalList={approvalList} />
        </Box>
      )}
    </Center>
  );
}
