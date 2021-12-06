import { Header } from "../../components/Header/Header";
import Footer from "../../components/Footer";
import Sidebar from "../../components/Sidebar/Sidebar";
import { Box, Flex, useColorModeValue as mode } from "@chakra-ui/react";

export default function PageContainer(props) {
  return (
    <>
      <Header />
        <Box height="140vh" overflow="hidden" position="relative">
        	<Flex h="full" id="app-container">
      			<Sidebar />
    				<Box h="100%" bg={mode("white", "gray.800")} flex="1">
      				{ props.children }
      				<Footer />
      			</Box>
        	</Flex>
      	</Box>
    </>
  );
}