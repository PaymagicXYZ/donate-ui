import {
  Box,
  Stack,
  StackProps,
  useColorModeValue
} from "@chakra-ui/react";
import PageContainer from '../../components/PageContainer/PageContainer'
import { Card } from '../../components/Card/Card'
import { HeadingGroup } from '../../components/Forms/HeadingGroup'
import DisperseERC721Form from '../../components/Forms/DisperseForms/DisperseERC721Form'

export default function Page() {
  let props

  return (
    <PageContainer>
      <Box bg={useColorModeValue('purple.50', 'purple.800')} py="10">
        <Box maxW="xl" mx="auto">
          <Stack spacing="12">
            <Stack as="section" spacing="6" {...props}>
              <HeadingGroup
                title="Send NFTs"
                description="Send NFTs to many recipients all at once, no need to claim."
              />
              <Card>
                <DisperseERC721Form />
              </Card>
            </Stack>
          </Stack>
        </Box>
      </Box>
    </PageContainer>
  );
}