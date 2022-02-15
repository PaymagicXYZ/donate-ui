import { Box } from "@chakra-ui/react";
import { TableContent } from "./TableContent";

export default function Table(props) {

  return (
    <Box py={{ base: "2", md: "4" }}>
      <TableContent
        walletData={props.balances}
        selectedIndices={props.selectedIndices}
        handleChange={props.handleChange}
      />
    </Box>
  );
}
