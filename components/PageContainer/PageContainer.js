import { Header } from "../../components/Header/Header";
import {
  Box,
  useColorModeValue as mode,
} from "@chakra-ui/react";
export default function PageContainer(props) {
  return (
    <Box
      width="100vw"
      padding="0"
      minHeight="100vh"
      bg={mode("purple.50", "purple.800")}
    >
      <Header />
      <Box>{props.children}</Box>
    </Box>
  );
}
