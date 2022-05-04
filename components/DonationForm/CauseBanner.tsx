import { VStack, Box, Text } from "@chakra-ui/react";

export default () => (
  <VStack w="full" p="3">
    <Box borderRadius={25} backgroundColor="purple.100" w="full" py="20px">
      <VStack alignItems="flex-start">
        <Text px="20px" fontSize="lg">
          Donate to Stani
        </Text>
        <Text px="20px" fontSize="sm" my={0}>
          Help Stani Kulechov regain his Twitter voice!
        </Text>
      </VStack>
    </Box>
  </VStack>
);
