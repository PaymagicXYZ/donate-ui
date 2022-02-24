import { Box, useColorModeValue as mode } from "@chakra-ui/react";
import { Card } from "../Card/Card";
import HoldingsList from "./HoldingsList";

export function Dashboard(props) {
  return (
    <Box bg={mode("purple.50", "purple.800")}>
      <Box mx="auto" w="90%">
        <Card>
          <HoldingsList {...props} />
        </Card>
      </Box>
    </Box>
  );
}
