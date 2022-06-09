import { useState, useEffect } from "react";
import { Flex, Text, Center, Button, HStack } from "@chakra-ui/react";
import TwitterIcon from "../CauseLink/TwitterIcon";

const DonationSuccess = () => {
  const [twitterLink, setTwitterLink] = useState("");
  const message = "I just donated to this cause!";
  useEffect(() => {
    setTwitterLink(
      `http://twitter.com/intent/tweet?text=${message.replaceAll(
        " ",
        "%20"
      )}&url=${window.location.href}`
    );
  });
  return (
    <Center w="full" h="full">
      <Flex direction="column" w="full">
        <Text w="full" fontSize="52px">
          ✨ 🙏
        </Text>
        <Text fontWeight={700} color="text" fontSize="40px">
          Thank you!
        </Text>
        <Text opacity={0.6} color="text" fontSize="20px" marginTop="16px">
          Help us get more donations by giving this a share.
        </Text>
        <Button
          _hover={{
            opacity: 0.8,
          }}
          marginTop="64px"
          h="48px"
          borderRadius="input"
          bg="twitter"
          color="text"
          onClick={() => window.open(twitterLink, "_blank")}
        >
          <HStack>
            <Text>Share on Twitter</Text> <TwitterIcon />
          </HStack>
        </Button>
      </Flex>
    </Center>
  );
};

export default DonationSuccess;
