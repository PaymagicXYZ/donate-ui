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
  //   Header: 'ACTION',
  //   accessor: 'name'
  // },
  {
    Header: 'MAKER',
    accessor: 'contract_address',
    Cell: function Cell(data: any) {
      return (
      	<Text>
      		{shortenAddress(data.contract_address)}
      	</Text>
      )
    }
  },
  {
    Header: 'YOU GET',
    accessor: 'balance',
    Cell: function Cell(data: any) {
      return (
        <TokenAmountDisplay
          amountUsd={data.quote}
          amountTokens={ethers.utils.formatUnits(
            data.balance,
            data.contract_decimals
          )}
          symbol={data.contract_ticker_symbol}
        />
      )
    }
  },
  {
    Header: 'TOKEN',
    accessor: 'contract_ticker_symbol',
    Cell: function Cell(data: any) {
      return (
        <TokenDisplay
          symbol={data.contract_ticker_symbol}
          imageUrl={data.logo_url}
        />
      )
    }
  },
  {
    Header: 'PRICE (CHAINLINK)',
    accessor: 'quote_rate',
    Cell: function Cell(data: any) {
      return numeral(
        data.quote_rate
        ).format('$0,0.00')
    }
  },
  {
    Header: 'COST TO YOU (9% OFF)',
    accessor: 'balance',
    Cell: function Cell(data: any) {
      return (
        <TokenAmountDisplay
          amountUsd={data.quote * .9}
          amountTokens={ethers.utils.formatUnits(
            ethers.BigNumber.from(data.balance).div('10').mul('9'),
            data.contract_decimals
          )}
          symbol={'ETH'}
        />
      )
    }
  }
]
