import { Box, Heading } from '@chakra-ui/react'
import * as React from 'react'
import { TableContent } from './TableContent'
import { TablePagination } from './TablePagination'

export const App = () => {
  return (
    <Box as="section" py={{ base: '2', md: '4' }}>
      <Box maxW={{ base: 'xl', md: '7xl' }} mx="auto" px={{ base: '2', md: '4' }}>
        <Box overflowX="auto">
          <TableContent />
          <TablePagination />
        </Box>
      </Box>
    </Box>
  )
}
