import { useMemo } from "react";
import _ from 'lodash';
import { Box } from "@chakra-ui/react";

import { TableContent } from "./TableContent";
import { cols } from "./_data";

import { useCovalent } from "../../hooks/useCovalent";
import { useWeb3React } from "@web3-react/core";
import { CovalentNetworkForID } from "../../utils/constants";



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
