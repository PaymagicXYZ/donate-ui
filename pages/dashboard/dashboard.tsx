import {
  Box,
  Stack,
  StackProps,
  Link,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import { Card } from "../../components/Card/Card";
import HoldingsList from "../../components/Holdings/HoldingsList";

export function Dashboard() {
  return (
    <Box bg={mode("purple.50", "purple.800")}>
      <Box mx="auto" w="90%">
        <Card>
          <HoldingsList />
        </Card>
      </Box>
    </Box>
  );
}
