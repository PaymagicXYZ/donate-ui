import { Header } from "../../components/Header/Header";
import { Box, useColorModeValue as mode } from "@chakra-ui/react";
export default function PageContainer(props) {
  return (
    <Box width="100vw" padding="0" minHeight="100vh" bg="rightPannel">
      <Header />
      <Box marginTop="10vh">{props.children}</Box>
    </Box>
  );
}
