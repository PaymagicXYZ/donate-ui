import {
  Box,
  createIcon,
  Flex,
  Heading,
  Img,
  SimpleGrid,
  Text,
  useColorModeValue as mode,
} from '@chakra-ui/react'
import * as React from 'react'
import { FeatureLink } from './FeatureLink'
import { links } from './_data'

export const RightArrow = createIcon({
  viewBox: '0 0 11 12',
  d: 'M0 0L4.8 6L0 12H5.78182L10.5818 6L5.78182 0H0Z',
})

export function AirdropFeature() {
  return (
      <Box maxW={{ base: 'xl', md: '7xl' }} mx="auto" px={{ base: '6', md: '8' }}>
        <Flex direction={{ base: 'column', lg: 'row' }} justify="space-between">
          <Box ms={{ lg: '12' }} mt={{ base: '12', lg: 0 }} flex="1" maxW={{ lg: 'xl' }}>
            <SimpleGrid columns={{ base: 1, md: 2 }} mt="8">
              {links.map((link) => (
                <Flex key={link.label} align="center" minH="14" borderBottomWidth="1px">
                  <FeatureLink href={link.href}>{link.label}</FeatureLink>
                </Flex>
              ))}
            </SimpleGrid>
          </Box>
        </Flex>
      </Box>
  )
}
