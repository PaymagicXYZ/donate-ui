import { GridItem, Container, Flex, Center } from "@chakra-ui/react";
import { RightHeader } from "../Header";

export const RightPannel = ({ children }) => (
  <GridItem
    overflowY="auto"
    css={{
      "&::-webkit-scrollbar": {
        width: "0px",
      },
      "&::-webkit-scrollbar-thumb": {
        background: "#ffffff21",
        borderRadius: "24px",
      },
    }}
    colSpan={[100, 100, 100, 45]}
    px="124"
    py="62"
    m="0"
    h="100vh"
    bg="rightPanel"
  >
    <Container h="calc(100% - 120px)">
      <RightHeader />
      <Flex
        h="full"
        marginBottom="10px"
        p="0"
        align="flex-start"
        direction="column"
      >
        <Center w="full" h="full" flexDirection="column">
          {children}
        </Center>
      </Flex>
    </Container>
  </GridItem>
);
