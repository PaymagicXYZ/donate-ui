import { Badge } from "@chakra-ui/react";
import * as React from "react";
import { Text, Link, Image } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { shortenAddress } from "../../utils";
import TokenDisplay from "../TokenDisplay";
import TokenAmountDisplay from "../TokenAmountDisplay";

export const cols: { Header: String; accessor: String; Cell?: Function }[] = [
  {
    Header: "Symbol",
    accessor: "symbol",
    Cell: ({ value }) => <TokenDisplay symbol={String(value)} />,
  },
  {
    Header: "Balance",
    accessor: "balance",
    Cell: ({ value }) => <TokenAmountDisplay amountTokens={String(value)} />,
  },
  {
    Header: "Value in USD",
    accessor: "balanceUSD",
    Cell: ({ value }) => <TokenAmountDisplay amountTokens={String(value)} />,
  },
  {
    Header: "Contract",
    accessor: "address",
    Cell: ({ value }) => (
      <Link href={`https://etherscan.io/token/${String(value)}`} isExternal>
        {shortenAddress(String(value))} <ExternalLinkIcon mx="2px" />
      </Link>
    ),
  },
];
