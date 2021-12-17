import { Badge } from "@chakra-ui/react";
import * as React from "react";
import { Text, Link } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";

import { shortenAddress } from "../../utils";

export const cols = [
  {
    Header: "Symbol",
    accessor: "symbol",
    Cell: function AssetCell(data: any) {
      return data;
    },
  },
  {
    Header: "Balance",
    accessor: "balance",
  },
  {
    Header: "Value in USD",
    accessor: "balanceUSD",
  },
  {
    Header: "Contract",
    accessor: "address",
    Cell: function StatusCell(data: any) {
      return (
        <Link href={`https://etherscan.io/token/${data}`} isExternal>
          {shortenAddress(data)} <ExternalLinkIcon mx="2px" />
        </Link>
      );
    },
  },
];
