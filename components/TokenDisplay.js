import React from 'react'
import _ from 'lodash';

import { Box, Img, Stack } from '@chakra-ui/react'

export default function TokenDisplay(props) {
  const symbol = props.symbol || '';
  const imageUrl = props.imageUrl || '';

  return (
    <Stack direction="row" spacing="4" align="center">
      <Box flexShrink={0} h="10" w="10">
        <Img
          objectFit="cover"
          htmlWidth="160px"
          htmlHeight="160px"
          w="10"
          h="10"
          rounded="full"
          src={imageUrl}
          alt=""
        />
      </Box>
      <Box>
        <Box fontSize="sm" fontWeight="medium">
          {symbol}
        </Box>
      </Box>
    </Stack>
  )
}