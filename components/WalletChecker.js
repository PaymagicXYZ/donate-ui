import _ from 'lodash';
import { Center, Spinner, Text } from '@chakra-ui/react'
import * as React from 'react'

export const WalletChecker = (props) => {
	const { loading, account, children } = props
	console.log('props',props)

  if(_.isUndefined(account)) {
    return (
      <Center>
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