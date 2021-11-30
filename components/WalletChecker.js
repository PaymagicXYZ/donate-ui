import * as React from 'react'
import _ from 'lodash';
import { Center, Spinner, Text } from '@chakra-ui/react'

export const WalletChecker = (props) => {
	const { loading, account, contractAddress, children } = props

  if(contractAddress === "0x") {
    return (
      <Center p="10">
        <Text as="i">🚫 Not available on this network</Text>
      </Center>
    )
  }

  if(_.isUndefined(account)) {
    return (
      <Center p="10">
        <Text as="i">👆 Connect wallet above</Text>
      </Center>
    )
  }

  if(loading) {
    return (
      <Center>
        <Spinner size="xl" />
      </Center>
    )
  }

  return (
  	<>
  		{children}
  	</>
  )
}