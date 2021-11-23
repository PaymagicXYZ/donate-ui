import { Badge } from '@chakra-ui/react'
import * as React from 'react'
import { User } from './User'
import {
  Text,
  Link
} from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'

import TokenDisplay from '../TokenDisplay'


import {
  shortenAddress,
  shortenTx,
  getBlockExplorerLink,
  displayTxDatetime,
} from "../../utils"


export const data = [
  {
    role: 'Admin',
    status: 'active',
    earned: '$45,000',
    id: 'blog',
    user: {
      image:
        'https://images.unsplash.com/photo-1512485694743-9c9538b4e6e0?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NDN8fGd1eSUyMGZhY2V8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60',
      name: 'Marion Watson',
      email: 'codyfisher@example.com',
    },
  },
  {
    role: 'Marketing Director',
    status: 'reviewing',
    earned: '$4,840',
    id: 'home',
    user: {
      image:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
      name: 'Louise Hopkins',
      email: 'jane@example.com',
    },
  },
  {
    role: 'Front Desk Officer',
    status: 'declined',
    id: 'design-system',
    earned: '$89,054',
    user: {
      image:
        'https://images.unsplash.com/photo-1470506028280-a011fb34b6f7?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NjN8fGxhZHklMjBmYWNlfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60',
      name: 'Susan Schwartz',
      email: 'jenyzx@exmaple.com',
    },
  },
  {
    role: 'Lead Software Engineer',
    status: 'active',
    earned: '$19,954',
    id: 'home-2',
    user: {
      image:
        'https://images.unsplash.com/photo-1533674689012-136b487b7736?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mjl8fGFmcmljYSUyMGxhZHklMjBmYWNlfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60',
      name: 'Sade Akinlade',
      email: 'melyb@example.com',
    },
  },
]

const badgeEnum: Record<string, string> = {
  active: 'green',
  reviewing: 'orange',
  declined: 'red',
}

export const cols = [
  {
    Header: 'ACTION',
    accessor: 'name'
  },
  {
    Header: 'AMOUNT',
    accessor: 'amount',
    // formatted
  },
  {
    Header: 'ASSET',
    accessor: 'symbol',
    Cell: function AssetCell(data: any) {
      return (
        <Text>
          {data}
        </Text>
        // <TokenDisplay
        //   symbol={symbol}
        //   imageUrl={ getTokenIconUriFromAddress(tx.address) }
        // />
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
        <Text RootComponent="span" muted>
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

export const columns = [
  {
    Header: 'Member',
    accessor: 'user',
    Cell: function MemberCell(data: any) {
      return <User data={data} />
    },
  },
  {
    Header: 'Role',
    accessor: 'role',
  },
  {
    Header: 'Status',
    accessor: 'status',
    Cell: function StatusCell(data: any) {
      return (
        <Badge fontSize="xs" colorScheme={badgeEnum[data]}>
          {data}
        </Badge>
      )
    },
  },
  {
    Header: 'Amount Earned',
    accessor: 'earned',
  }
]
