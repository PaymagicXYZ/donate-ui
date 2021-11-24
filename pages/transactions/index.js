import {
  Box,
  Stack,
  StackProps,
  useColorModeValue as mode
} from "@chakra-ui/react";
import PageContainer from '../../components/PageContainer/PageContainer'
import { Card } from '../../components/Card/Card'
import { HeadingGroup } from '../../components/Forms/HeadingGroup'
import TransactionTable from '../../components/TransactionTable/TransactionTable'

export default function Page() {
  let props

  return (
    <PageContainer>
      <Box bg={mode('purple.50', 'purple.800')} py="10">
        <Box mx="auto" w="90%">
          <Stack as="section" spacing="6" {...props}>
            <HeadingGroup
              title="Transaction History"
              size="lg"
            />
            <Card>
              <TransactionTable />
            </Card>
          </Stack>
        </Box>
      </Box>
    </PageContainer>
  )
}