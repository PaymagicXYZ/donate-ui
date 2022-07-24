import { GridItem, Container, Flex } from "@chakra-ui/react";
import { LeftHeader } from "./LeftHeader";
import { RightHeader } from "./RightHeader";

export const FullHeader = () => {
  return (
    <GridItem colSpan={100} p="0" m="0">
      <Flex>
        <LeftHeader />
        <RightHeader />
      </Flex>
    </GridItem>
  );
};
