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