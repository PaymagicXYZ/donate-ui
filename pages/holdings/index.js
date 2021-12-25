import {
  Box,
  Stack,
  StackProps,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import PageContainer from "../../components/PageContainer/PageContainer";
import { Card } from "../../components/Card/Card";
import { HeadingGroup } from "../../components/Forms/HeadingGroup";
import HoldingsList from "../../components/Holdings/HoldingsList";

export default function Page() {
  let props;

  return (
    <PageContainer>
      <Box bg={mode("purple.50", "purple.800")} py="10">
        <Box mx="auto" w="90%">
          <Stack as="section" spacing="6" {...props}>
            <HeadingGroup title="Holdings" size="lg" />
            <Card>
              <HoldingsList />
            </Card>
          </Stack>
        </Box>
      </Box>
    </PageContainer>
  );
}