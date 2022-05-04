import {
  Flex,
  Grid,
  GridItem,
  VStack,
  Text,
  HStack,
  Button,
} from "@chakra-ui/react";

const LEARN_MORE_LINK =
  "https://twitter.com/fcmartinelli/status/1519609111935127553?s=21&t=h8tZQnOqyFTZtbpqiYILfg";

export default () => (
  <VStack w="full" p="3">
    <HStack borderRadius={25} backgroundColor="purple.100" w="full" py="20px">
      <Grid templateColumns="repeat(3, 1fr)" gap={0}>
        <GridItem colSpan={2}>
          <VStack alignItems="flex-start">
            <Text px="20px" fontSize="lg">
              Donate to Stani
            </Text>
            <Text lineHeight="15px" px="20px" fontSize="xs" my={0}>
              Help Stani Kulechov regain his Twitter voice! and then some more
              text yahooo
            </Text>
          </VStack>
        </GridItem>
        <Flex alignItems="center" justify="center">
          <Button borderRadius="10px">
            <a target="_blank" href={LEARN_MORE_LINK}>
              Learn More
            </a>
          </Button>
        </Flex>
      </Grid>
    </HStack>
  </VStack>
);
