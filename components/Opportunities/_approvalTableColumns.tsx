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
    Cell: ({ value }) => <Text>{value}</Text>,
  },
  {
    Header: "TOKEN",
    accessor: "symbol",
    Cell: ({ value }) => <TokenDisplay symbol={value[0]} imageUrl={value[1]} />,
  },
  {
    Header: "MAKER",
    accessor: "maker",
    Cell: ({ value }) => <Text>{value}</Text>,
  },
];
