import {
  Box,
  Stack,
  StackProps,
  useColorModeValue
} from "@chakra-ui/react";
import PageContainer from '../../components/PageContainer/PageContainer'
import { Card } from '../../components/Card/Card'
import { HeadingGroup } from '../../components/Forms/HeadingGroup'
import SendAirdropForm from '../../components/Forms/AirdropForms/SendAirdropForm'

export default function Page() {
  let props

  return (
    <PageContainer>
      <Box bg={useColorModeValue('purple.50', 'purple.800')} py="10">
        <Box maxW="xl" mx="auto">
          <Stack spacing="12">
            <Stack as="section" spacing="6" {...props}>
              <HeadingGroup
                title="Send Token Airdrop"
                description="Send tokens for recipients to claim. Great for issuing staking rewards, sending yield to liquidity providers, or rewarding your community."
              />
              <Card>
                <SendAirdropForm />
              </Card>
            </Stack>
          </Stack>
        </Box>
      </Box>
    </PageContainer>
  );
}