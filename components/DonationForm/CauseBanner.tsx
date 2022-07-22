import {
  Flex,
  Grid,
  GridItem,
  VStack,
  Text,
  HStack,
  Button,
  Spacer,
} from "@chakra-ui/react";
import { Cause } from "../../types/cause";

export default function CauseBanner({ causeData }: { causeData: Cause }) {
  return (
    <VStack w="full" p="3">
      <HStack borderRadius={25} backgroundColor="purple.100" w="full" py="20px">
        <Grid templateColumns="repeat(3, 1fr)" w="full">
          <GridItem colSpan={2}>
            <VStack alignItems="flex-start">
              <Text px="20px" fontSize="lg">
                {causeData?.title}
              </Text>
              <Text lineHeight="15px" px="20px" fontSize="xs" my={0}>
                {causeData?.description}
              </Text>
            </VStack>
          </GridItem>
          <Flex alignItems="center" justify="center">
            <Button borderRadius="10px">
              <a
                rel="noopener noreferrer"
                target="_blank"
                href={causeData?.learnMoreLink}
              >
                Learn More
              </a>
            </Button>
          </Flex>
        </Grid>
      </HStack>
    </VStack>
  );
}
