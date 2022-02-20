import { Header } from "../../components/Header/Header";
import Footer from "../../components/Footer";
import { Box, Alert, Text, Flex, Link, useColorModeValue as mode } from "@chakra-ui/react";

export default function PageContainer(props) {
  return (
    <>
      <Header />
        <Alert status="error">
          <Text>
            The app only works on *Mainnet forks* right now. If you would like to see it deployed to mainnet, consider giving <Link href={'https://mirror.xyz/dashboard/edit/EwldfOSzRyv2uwOg8hCctXdvfps4LygGZnIR2j_mrJk'} isExternal>on Mirror</Link>.
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