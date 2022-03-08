import { Header } from "../../components/Header/Header";
import Footer from "../../components/Footer";
import {
  Box,
  Alert,
  Text,
  Flex,
  Link,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
export default function PageContainer(props) {
  const { t, i18n } = useTranslation();
  return (
    <>
      <Header />
      <Alert status="error">
        <Text mx="auto">{t("alert")}</Text>
      </Alert>
      <Box
        overflow="hidden"
        minH="100vh"
        position="relative"
        bg={mode("purple.50", "purple.800")}
      >
        <Flex h="100%" id="app-container">
          {props.children}
        </Flex>
      </Box>
      <Footer />
    </>
  );
}
