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

export const SendDisperseForm = (props: StackProps) => (
  <Stack as="section" spacing="6" {...props}>
    <HeadingGroup
      title="Send Batch Payment"
      description="Send tokens or NFTs to many recipients all at once."
    />
    <Card>
  		<Tabs isFitted variant="enclosed">
  		  <TabList>
  		    <Tab>ERC20 Tokens</Tab>
  		    <Tab isDisabled>NFT (721)</Tab>
  		    <Tab isDisabled>NFT (1155)</Tab>
  		  </TabList>
  		  <TabPanels>
  		    <TabPanel>
  		      <ERC20Form />
  		    </TabPanel>
  		    <TabPanel>
  		      <p>two!</p>
  		    </TabPanel>
  		    <TabPanel>
  		      <p>three!</p>
  		    </TabPanel>
  		  </TabPanels>
  		</Tabs>
    </Card>
  </Stack>
)
