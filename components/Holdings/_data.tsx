import { Badge, Img } from "@chakra-ui/react";
import * as React from "react";
import { Text, Link, Image } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { shortenAddress } from "../../utils";
import TokenDisplay from "../TokenDisplay";
import TokenAmountDisplay from "../TokenAmountDisplay";
// const typeImg = {
//   cryptocurrency:
//     "https://img.icons8.com/pastel-glyph/64/000000/cryptocurrency.png",
//   stablecoin:
//     "https://img.icons8.com/external-flat-icons-inmotus-design/67/000000/external-coin-coin-money-flat-icons-inmotus-design-2.png",
//   dust: "https://img.icons8.com/external-kiranshastry-solid-kiranshastry/64/000000/external-dust-pan-hygiene-kiranshastry-solid-kiranshastry-1.png",
// };

export const cols: {
  Header: String;
  accessor: String | String[];
  Cell?: Function;
  Filter?: Function;
  filter?: String;
}[] = [
  {
    Header: "Symbol",
    accessor: "symbol",
    Cell: ({ value }) => (
      <TokenDisplay imageUrl={value[1]} symbol={String(value[0])} />
    ),
  },
  {
    Header: "Type",
    accessor: "type",
    // Cell: ({ value }) => (
    //   <TokenDisplay imageUrl={typeImg[value]} symbol={String(value)} />
    // ),
    // Filter: SelectColumnFilter,
    filter: "includes",
  },
  {
    Header: "Balance",
    accessor: "balance",
    Cell: ({ value }) => <TokenAmountDisplay amountTokens={String(value)} />,
  },
  {
    Header: "Value in USD",
    accessor: "value",
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
