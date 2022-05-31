import { Flex } from "@chakra-ui/react";

export default function InputContainer({ children }) {
  return (
    <Flex
      transition="3000"
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
}
