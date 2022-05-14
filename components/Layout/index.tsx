import { Container } from "@chakra-ui/react";
import PageContainer from "../../components/PageContainer/PageContainer";

export default function ({ children }) {
  return (
    <PageContainer>
      <Container maxW="container.sm" py="50px" px="80px">
        {children}
      </Container>
    </PageContainer>
  );
}
