import {
  HStack,
  Avatar,
  Box,
  Button,
  FormControl,
  FormLabel,
  Select,
  Input,
  Textarea,
  Switch,
  Text,
  Stack,
  StackDivider,
  StackProps,
} from '@chakra-ui/react'
import * as React from 'react'
import { Card } from './Card'
import { FieldGroup } from './FieldGroup'
import { HeadingGroup } from './HeadingGroup'

export const AirdropForm = (props: StackProps) => (
  <Stack as="section" spacing="6" {...props}>
    <HeadingGroup
      title="Send Airdrop"
      description="Send token or NFT rewards that recipients can claim"
    />
    <Card>
      <Stack spacing="6">
        <FieldGroup>
          <Stack direction={{ base: 'column', md: 'row' }} width="full" spacing="4">
            <FormControl id="tokenAddress">
              <FormLabel fontSize="sm">TOKEN ADDRESS</FormLabel>
              <Input placeholder="0x..." />
            </FormControl>

            <FormControl id="tokenType">
              <FormLabel fontSize="sm">TOKEN TYPE</FormLabel>
              <Select size="sm" maxW="2xs">
                <option>Token (ERC 20)</option>
                <option>NFT (ERC 721)</option>
                <option>NFT (ERC 1155)</option>
              </Select>
            </FormControl>
          </Stack>
        </FieldGroup>
        <FieldGroup>
          <Stack direction={{ base: 'column', md: 'row' }} width="full" spacing="4">
            <FormControl id="recipients">
              <FormLabel fontSize="sm">RECIPIENTS</FormLabel>
              <Textarea placeholder="0x..." />
            </FormControl>
          </Stack>
        </FieldGroup>
        <StackDivider />
        <FieldGroup>
          <FormLabel fontSize="sm">CONFIRMATION DETAILS</FormLabel>
          <Text color="gray.500" fontSize="sm">
            -----
            $0 Total
          </Text>
        </FieldGroup>
        <StackDivider />

        <FieldGroup>
          <FormControl id="submit">
            <Button mt="5" size="sm" fontWeight="normal" colorScheme="purple">
              Approve
            </Button>
          </FormControl>
        </FieldGroup>

      </Stack>
    </Card>
  </Stack>
)
