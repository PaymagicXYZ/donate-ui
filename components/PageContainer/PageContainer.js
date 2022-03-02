import { Header } from "../../components/Header/Header";
import Footer from "../../components/Footer";
import { Box, Alert, Text, Flex, Link, useColorModeValue as mode } from "@chakra-ui/react";

export default function PageContainer(props) {
  return (
    <>
      <Header />
        <Alert status="error">
          <Text mx="auto">
            ⚠️⚠️⚠️ We are in **Test Mode**. You could lose your tokens or pay super high fees! Use at your own risk! ⚠️⚠️⚠️
          </Text>
        </Alert>
        <Box overflow="hidden" minH="100vh" position="relative" bg={mode('purple.50', 'purple.800')}>
        	<Flex h="100%" id="app-container">
      			{ props.children }
        	</Flex>
      	</Box>
      <Footer />
    </>
  );
}