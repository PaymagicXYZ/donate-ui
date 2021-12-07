import * as React from 'react'
import Link from "next/link";
import { Box, Stack, Divider, Text, Link as ChakraLink } from '@chakra-ui/react'

export default function Footer() {
  return (
    <Box as="footer" role="contentinfo" mx="auto" maxW="7xl" py="12" px={{ base: '4', md: '8' }}>
      <Divider mt="6" mb="2"/>
      <Stack color="grey" direction="row" spacing="4" align="center" justify="center">
        <ChakraLink href="https://www.paymagic.xyz" isExternal>
          Home
        </ChakraLink>
        <Text>
          |
        </Text>
        <ChakraLink href="https://t.me/paymagics" isExternal>
          Telegram
        </ChakraLink>
        <Text>
          |
        </Text>
        <ChakraLink href="https://twitter.com/paymagic_" isExternal>
          Twitter
        </ChakraLink>
      </Stack>
    </Box>
  )
}