import { useRouter } from "next/router";
import {
  Box,
  Stack,
  StackProps,
  Link,
  Text,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import PageContainer from "../../../components/PageContainer/PageContainer";
import { Card } from "../../../components/Card/Card";
import { HeadingGroup } from "../../../components/Forms/HeadingGroup";
import HoldingsList from "../../../components/Holdings/HoldingsList";

export default function Page() {
  let props;
  const router = useRouter();
  const { chain, accountAddress } = router.query;
  return (
    <PageContainer>
      <Box bg={mode("purple.50", "purple.800")}>
        <Box mx="auto" w="90%">
          <Stack as="section" spacing="6" {...props}>
            <HeadingGroup
              title={`Holdings for "${accountAddress}" on ${chain}`}
              size="lg"
            />
            <Text>
              Please be aware, this might not be your account. &nbsp;
              <Link to="/holdings" color="teal.500">
                To your account
              </Link>
            </Text>

            <Card>
              <HoldingsList chain={chain} accountAddress={accountAddress} />
            </Card>
          </Stack>
        </Box>
      </Box>
    </PageContainer>
  );
}
