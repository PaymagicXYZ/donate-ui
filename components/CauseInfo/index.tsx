import { Divider, Button, Flex, Text } from "@chakra-ui/react";
import Image from "next/image";
import { Box } from "@chakra-ui/react";
import { FC } from "react";
import { Cause } from "../../types/cause";
import logo from "./Logo.png";
import ExternalLink from "../Icons/ExternalLink";

interface Props {
  causeData: Cause;
}

const CauseInfo: FC<Props> = ({ causeData }) => {
  return (
    <Flex direction="column" w="full" alignItems="flex-start">
      <Box borderRadius="full" overflow="hidden" h="96px" w="96px">
        {causeData?.logoURL ? (
          <Image src={causeData.logoURL} height="96px" width="96px" />
        ) : (
          <Box height="96px" width="96px" bg="black" borderRadius="full" />
        )}
      </Box>
      <Text marginTop="24px" fontSize="title" fontWeight="700" color="text">
        {causeData?.title}
      </Text>
      <Text
        marginTop="16px"
        color="text"
        fontSize="select"
        opacity={0.6}
        lineHeight="description"
      >
        {causeData?.description}
      </Text>
      <Button
        marginTop="24px"
        opacity={0.9}
        color="learnMore.text"
        _hover={{
          bg: "learnMore.hover",
        }}
        bg="learnMore.active"
        rightIcon={<ExternalLink />}
        as="a"
        target="_blank"
        href={causeData?.learn_more_link}
      >
        Learn More
      </Button>
      <Divider opacity={0.05} my="32px" />
    </Flex>
  );
};

export default CauseInfo;
