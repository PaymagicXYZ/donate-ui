import { Header } from "../../components/Header/Header";
import Footer from "../../components/Footer";
import { Box, Flex, useColorModeValue as mode } from "@chakra-ui/react";

export default function PageContainer(props) {
  return (
    <>
      <Header />
        <Box overflow="hidden" position="relative" bg={mode('purple.50', 'purple.800')}>
        	<Flex h="100%" id="app-container">
      			{ props.children }
        	</Flex>
      	</Box>
      <Footer />
    </>
  );
}