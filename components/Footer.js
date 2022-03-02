import * as React from 'react'
import Link from "next/link";
import { Box, Stack, Divider, Text, Link as ChakraLink, useColorModeValue as mode } from '@chakra-ui/react'

export default function Footer() {
  return (
    <Box as="footer" role="contentinfo" m="0" w="100%" py="12" px={{ base: '4', md: '8' }} bg={mode('purple.50', 'purple.800')}>
      <Divider mt="6" mb="2"/>
      <Stack color="grey" direction="row" spacing="4" align="center" justify="center">
        <ChakraLink href="https://launch.mirror.xyz/EwldfOSzRyv2uwOg8hCctXdvfps4LygGZnIR2j_mrJk" isExternal>
          About
        </ChakraLink>
        <Text>
          |
        </Text>
        <ChakraLink href="https://airtable.com/shrL21KLg8NQHuDWH" isExternal>
          Report Bugs or Feedback
        </ChakraLink>
        <Text>
          |
        </Text>
        <ChakraLink href="https://discord.gg/CjeeqMeAGc" isExternal>
          Discord
        </ChakraLink>
        <Text>
          |
        </Text>
        <ChakraLink href="https://twitter.com/DustSweeperDAO" isExternal>
          Twitter
        </ChakraLink>
        <Text>
          |
        </Text>
        <ChakraLink href="https://www.paymagic.xyz" isExternal>
          Built by Paymagic
        </ChakraLink>
      </Stack>
    </Box>
  )
}