import { Badge, Center } from "@chakra-ui/react";
import * as React from "react";
import { ethers } from "ethers";
import { Text, Link, Tooltip } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import numeral from "numeral";
import TokenDisplay from "../TokenDisplay";
import TokenAmountDisplay from "../TokenAmountDisplay";

import { displayISODatetime } from "../../utils";

export const cols = [
  {
    Header: "TOKEN",
    accessor: "symbol",
    Cell: ({ value }) => (
      <TokenDisplay imageUrl={value[1]} symbol={String(value[0])} />
    ),
  },

  {
    Header: "PRICE",
    accessor: "quote_rate",
    Cell: ({ value }) => numeral(value).format("$0,0.00"),
  },

  {
    Header: "LAST TRANSFERRED",
    accessor: "last_transferred_at",
    Cell: ({ value }) => <Text>{displayISODatetime(value)}</Text>,
  },

  {
    Header: "BALANCE",
    accessor: "balance",
    Cell: ({ value }) => (
      <TokenAmountDisplay
        amountUsd={value[0]}
        amountTokens={ethers.utils.formatUnits(value[1], value[2])}
        symbol={value[3]}
      />
    ),
  },

  {
    Header: "YOU RECEIVE IN ETH",
    accessor: "balanceETH",
    Cell: ({ value }) =>
      value == null ? null : (
        <Center>
          <TokenAmountDisplay amountUsd={value[0]} amountEth={value[1]} />
        </Center>
      ),
  },

  // {
  //   Header: 'App',
  //   accessor: 'input',
  // },
  // {
  //   Header: 'STATUS',
  //   accessor: 'txSuccessful',
  //   Cell: function StatusCell(data: any) {
  //     return (
  //       data ? (
  //         <Badge fontSize="xs" colorScheme="green">
  //           Confirmed
  //         </Badge>
  //       ) : (
  //         <Badge fontSize="xs" colorScheme="yellow">
  //           Pending
  //         </Badge>
  //       )
  //     )
  //   }
  // },
  // {
  //   Header: 'DATE',
  //   accessor: 'timeStamp',
  //   Cell: function StatusCell(data: any) {
  //     return (
  //       <Text RootComponent="span">
  //         { displayTxDatetime(data) }
  //       </Text>
  //     )
  //   }
  // },
  // {
  //   Header: 'TX HASH',
  //   accessor: 'hash',
  //   Cell: function StatusCell(data: any) {
  //     return (
  //       <Link href={getBlockExplorerLink(data,'transaction')} isExternal>
  //         { shortenTx(data) } <ExternalLinkIcon mx="2px" />
  //       </Link>
  //     )
  //   }
  // }
];
