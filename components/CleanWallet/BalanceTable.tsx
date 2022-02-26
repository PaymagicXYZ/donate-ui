import { Box } from "@chakra-ui/react";
import { cols } from "./_columns";
import { CustomTable } from "../Table/CustomTable";

export default function BalanceTable(props) {
  const { balances } = props;
  return (
    <Box py={{ base: "2", md: "4" }}>
      <CustomTable columns={cols} data={balances} />
    </Box>
  );
}
