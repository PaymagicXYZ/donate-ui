import { Flex } from "@chakra-ui/react";

export default ({ children }) => (
  <Flex
    backgroundColor="white"
    border="1px"
    w="full"
    borderRadius={25}
    align="center"
    p={5}
  >
    {children}
  </Flex>
);
