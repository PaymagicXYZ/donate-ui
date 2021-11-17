import {
  Box,
  Stack,
  useColorModeValue
} from "@chakra-ui/react";
import PageContainer from "../../components/PageContainer/PageContainer";
import { SendDisperseForm } from "../../components/Forms/SendDisperseForm";

export default function Page() {

  return (
    <PageContainer>
      <Box bg={useColorModeValue('purple.50', 'purple.800')} py="10">
        <Box maxW="xl" mx="auto">
          <Stack spacing="12">
            <SendDisperseForm />
          </Stack>
        </Box>
      </Box>
    </PageContainer>
  );
}

import * as React from 'react'
import {
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
  Stack,
  StackProps,
} from '@chakra-ui/react'

import { Card } from './Card'
import { FieldGroup } from './FieldGroup'
import { HeadingGroup } from './HeadingGroup'
import ERC20Form from './DisperseForms/ERC20Form'
import ERC721Form from './DisperseForms/ERC721Form'

export const SendDisperseForm = (props: StackProps) => (
  <Stack as="section" spacing="6" {...props}>
    <HeadingGroup
      title="Send Batch NFTs"
      description="Send NFTs to many recipients all at once, no need to claim."
    />
    <Card>
      <ERC20Form />
    </Card>
  </Stack>
)
