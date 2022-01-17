import { Badge } from "@chakra-ui/react";
import * as React from "react";
import { Text, Link, Image } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { shortenAddress } from "../../utils";
import TokenDisplay from "../TokenDisplay";
import TokenAmountDisplay from "../TokenAmountDisplay";

export const cols = [
  {
    Header: "Symbol",
    accessor: "symbol",
    Cell: function AssetCell(data: any) {
      return <TokenDisplay symbol={data} />;
    },
  },
  {
    Header: "Balance",
    accessor: "balance",
    Cell: function AmountCell(data: any) {
      return <TokenAmountDisplay amountTokens={data} />;
    },
  },
  {
    Header: "Value in USD",
    accessor: "balanceUSD",
    Cell: function AmountCell(data: any) {
      return <TokenAmountDisplay amountTokens={data} />;
    },
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
