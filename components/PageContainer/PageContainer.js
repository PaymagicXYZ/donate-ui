import { Header } from "../../components/Header/Header";
import Footer from "../../components/Footer";
import {
  Box,
  Alert,
  Container,
  Text,
  Flex,
  Link,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
export default function PageContainer(props) {
  const { t } = useTranslation("common");
  return (
    <Box
      width="100vw"
      padding="0"
      minHeight="100vh"
      bg={mode("purple.50", "purple.800")}
    >
      <Header />
      <Alert status="error">
        <Text mx="auto">{t("alert")}</Text>
      </Alert>
      <Box>{props.children}</Box>
      <Footer />
    </Box>
  );
}
