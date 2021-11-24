import { Button, ButtonGroup, Flex, Text, useColorModeValue as mode } from '@chakra-ui/react'
import * as React from 'react'

export const TablePagination = () => {
  return (
    <Flex align="center" justify="space-between">
      <Text color={mode('gray.600', 'gray.400')} fontSize="sm">
        {`10`} members
      </Text>
      <ButtonGroup variant="outline" size="sm">
        <Button as="a" rel="prev">
          Previous
        </Button>
        <Button as="a" rel="next">
          Next
        </Button>
      </ButtonGroup>
    </Flex>
  )
}
