import { Header } from "../../components/Header/Header";
import Footer from "../../components/Footer";
import { Box, Alert, Text, Flex, Link, useColorModeValue as mode } from "@chakra-ui/react";

export default function PageContainer(props) {
  return (
    <>
      <Header />
        <Alert status="error">
          <Text mx="auto">
            The app only works on **Testnets** right now. <Link href={'https://discord.gg/CjeeqMeAGc'} isExternal>Join our Discord</Link> for updates on the mainnet launch.
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