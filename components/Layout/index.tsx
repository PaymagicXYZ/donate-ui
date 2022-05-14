import { Container } from "@chakra-ui/react";
import PageContainer from "../../components/PageContainer/PageContainer";

const Layout = ({ children }) => {
  return (
    <PageContainer>
      <Container maxW="container.sm" py="50px" px="80px">
        {children}
      </Container>
    </PageContainer>
  );
};

export default Layout;
