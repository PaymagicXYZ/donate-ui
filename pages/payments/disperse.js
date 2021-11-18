import {
  Box,
  Stack,
  StackProps,
  useColorModeValue
} from "@chakra-ui/react";
import PageContainer from '../../components/PageContainer/PageContainer'
import { Card } from '../../components/Card/Card'
import { HeadingGroup } from '../../components/Forms/HeadingGroup'
import DisperseERC20Form from '../../components/Forms/DisperseForms/DisperseERC20Form'

export default function Page() {
  let props

  return (
    <PageContainer>
      <Box bg={useColorModeValue('purple.50', 'purple.800')} py="10">
        <Box maxW="xl" mx="auto">
          <Stack spacing="12">
            <Stack as="section" spacing="6" {...props}>
              <HeadingGroup
                title="Send Batch Transfer"
                description="Send tokens to many recipients all at once."
              />
              <Card>
                <DisperseERC20Form />
              </Card>
            </Stack>
          </Stack>
        </Box>
      </Box>
    </PageContainer>
  );
}