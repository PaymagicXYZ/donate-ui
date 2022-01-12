import {
  Box,
  Stack,
  StackProps,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import PageContainer from "../../../components/PageContainer/PageContainer";
import { Card } from "../../../components/Card/Card";
import { HeadingGroup } from "../../../components/Forms/HeadingGroup";

export default function Page() {
  let props;

  return (
    <PageContainer>
      <Box bg={mode("purple.50", "purple.800")} py="10">
        <Box mx="auto" w="90%">
          <Stack as="section" spacing="6" {...props}>
            <HeadingGroup title="Holdings" size="lg" />
            <Card>
              {/* <iframe={`https://dune.xyz/embeds/1171/1994/2f9d12ee-3981-4de1-a79d-f8efba29f238`} /> */}
            </Card>
          </Stack>
        </Box>
      </Box>
    </PageContainer>
  );
}
