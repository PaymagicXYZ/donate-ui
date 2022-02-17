import { Badge } from '@chakra-ui/react'
import * as React from 'react'
import { ethers } from "ethers";
import { User } from './User'
import {
  Text,
  Link
} from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import numeral from "numeral";
import TokenDisplay from '../TokenDisplay'
import TokenAmountDisplay from '../TokenAmountDisplay'


import {
  shortenAddress,
  shortenTx,
  getBlockExplorerLink,
  displayISODatetime,
} from "../../utils"

export const cols = [
  // {
  //   Header: 'YOU GET',
  //   accessor: 'balance',
  //   Cell: function Cell(data: any) {
  //     return (
  //       data.allowance?.gt(ethers.BigNumber.from('1000000000000000000000000000')) ?
  //       <Text>Infinite Approval</Text> :
  //       <TokenAmountDisplay
  //         amountTokens={ethers.utils.formatUnits(
  //           data.allowance,
  //           data.decimals
  //         )}
  //         symbol={data.symbol}
  //       />
  //     )
  //   }
  // },
  // {
  //   Header: 'YOU GET',
  //   accessor: 'balance',
  //   Cell: function Cell(data: any) {
  //     return (
  //       <Text>
  //         {data.allowance?.toString()}
  //       </Text>
  //     )
  //   }
  // },
  {
    Header: 'TOKEN',
    accessor: 'contract_ticker_symbol',
    Cell: function Cell(data: any) {
      return (
        <>
          <TokenDisplay
            symbol={data.symbol}
          />
          <Text>
            {data.address}
          </Text>
        </>
      )
    }
  },
  // {
  //   Header: 'COST TO YOU (9% OFF)',
  //   accessor: 'balance',
  //   Cell: function Cell(data: any) {
  //     return (
  //       <TokenAmountDisplay
  //         amountUsd={data.quote * .9}
  //         amountTokens={ethers.utils.formatUnits(
  //           ethers.BigNumber.from(data.balance).div('10').mul('9'),
  //           data.contract_decimals
  //         )}
  //         symbol={'ETH'}
  //       />
  //     )
  //   }
  // },
  // {
  //   Header: 'DISCOUNT',
  //   accessor: 'discount',
  //   Cell: function Cell(data: any) {
  //     return (
  //       <TokenAmountDisplay
  //         amountUsd={data.quote * .09}
  //       />
  //     )
  //   }
  // },
  {
    Header: 'MAKER',
    accessor: 'contract_address',
    Cell: function Cell(data: any) {
      return (
        <Text>
          {data.owner}
        </Text>
      )
    }
  }
]
