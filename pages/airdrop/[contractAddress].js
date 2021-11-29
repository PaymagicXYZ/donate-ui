import { useRouter } from 'next/router'
import {
  Box,
  Stack,
  StackProps,
  useColorModeValue
} from "@chakra-ui/react";
import PageContainer from '../../components/PageContainer/PageContainer'
import { Card } from '../../components/Card/Card'
import { HeadingGroup } from '../../components/Forms/HeadingGroup'
import ClaimAirdropForm from '../../components/Forms/AirdropForms/ClaimAirdropForm'

export default function Page(props) {
  const router = useRouter()
  const { contractAddress } = router.query

  return (
    <PageContainer>
      <Box bg={useColorModeValue('purple.50', 'purple.800')} py="10">
        <Box maxW="xl" mx="auto">
          <Stack spacing="12">
            <Stack as="section" spacing="6" {...props}>
              <HeadingGroup
                title="Claim Airdrop"
                description="Check your eligibility below and claim your NFTs or tokens."
              />
              <Card>
                <ClaimAirdropForm contractAddress={contractAddress} />
              </Card>
            </Stack>
          </Stack>
        </Box>
      </Box>
    </PageContainer>
  );
}