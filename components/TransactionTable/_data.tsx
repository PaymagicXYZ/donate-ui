import { Badge } from '@chakra-ui/react'
import * as React from 'react'
import { User } from './User'
import {
  Text,
  Link
} from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'

import TokenDisplay from '../TokenDisplay'
import TokenAmountDisplay from '../TokenAmountDisplay'


import {
  shortenAddress,
  shortenTx,
  getBlockExplorerLink,
  displayTxDatetime,
} from "../../utils"

export const cols = [
  {
    Header: 'ACTION',
    accessor: 'name'
  },
  {
    Header: 'AMOUNT',
    accessor: 'amount',
    Cell: function AmountCell(data: any) {
      return (
        <TokenAmountDisplay
          amountTokens={data}
        />
      )
    }
  },
  {
    Header: 'ASSET',
    accessor: 'symbol',
    Cell: function AssetCell(data: any) {
      return (
        <TokenDisplay
          symbol={data}
        />
      )
    }
  },
  {
    Header: 'App',
    accessor: 'input',
  },
  {
    Header: 'STATUS',
    accessor: 'txSuccessful',
    Cell: function StatusCell(data: any) {
      return (
        data ? (
          <Badge fontSize="xs" colorScheme="green">
            Confirmed
          </Badge>
        ) : (
          <Badge fontSize="xs" colorScheme="yellow">
            Pending
          </Badge>
        )
      )
    }
  },
  {
    Header: 'DATE',
    accessor: 'timeStamp',
    Cell: function StatusCell(data: any) {
      return (
        <Text RootComponent="span">
          { displayTxDatetime(data) }
        </Text>
      )
    }
  },
  {
    Header: 'TX HASH',
    accessor: 'hash',
    Cell: function StatusCell(data: any) {
      return (
        <Link href={getBlockExplorerLink(data,'transaction')} isExternal>
          { shortenTx(data) } <ExternalLinkIcon mx="2px" />
        </Link>
      )
    }
  }
]
