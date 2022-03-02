import { Badge } from "@chakra-ui/react";
import * as React from "react";
import { Text, Link } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import numeral from "numeral";
import TokenDisplay from "../TokenDisplay";
import TokenAmountDisplay from "../TokenAmountDisplay";

import {
  shortenAddress,
  shortenTx,
  getBlockExplorerLink,
  displayISODatetime,
} from "../../utils";

export const cols = [
  {
    Header: "YOU GET",
    accessor: "balance",
    Cell: function Cell(data: any) {
      return <Text>{data.balance}</Text>;
    },
  },
  {
    Header: "TOKEN",
    accessor: "symbol",
    Cell: function Cell(data: any) {
      return (
        <>
          <TokenDisplay symbol={data.symbol[0]} imageUrl={data.symbol[1]} />
          {/* <Text>{data.address}</Text> */}
        </>
      );
    },
  },
  {
    Header: "MAKER",
    accessor: "maker",
    Cell: function Cell(data: any) {
      return <Text>{shortenAddress(data.maker, 12)}</Text>;
    },
  },
];
