import * as React from "react";
import Link from "next/link";
import {
  Box,
  Stack,
  VStack,
  StackDivider,
  Divider,
  Text,
  Link as ChakraLink,
  useColorModeValue as mode,
} from "@chakra-ui/react";
const FooterDivider = () => (
  <Text display={{ base: "none", md: "flex" }}>|</Text>
);
const FooterChildren = () => (
  <>
    <ChakraLink
      href="https://launch.mirror.xyz/EwldfOSzRyv2uwOg8hCctXdvfps4LygGZnIR2j_mrJk"
      isExternal
    >
      About
    </ChakraLink>
    <FooterDivider />
    <ChakraLink href="https://airtable.com/shrL21KLg8NQHuDWH" isExternal>
      Report Bugs or Feedback
    </ChakraLink>
    <FooterDivider />
    <ChakraLink href="https://discord.gg/CjeeqMeAGc" isExternal>
      Discord
    </ChakraLink>
    <FooterDivider />
    <ChakraLink href="https://twitter.com/DustSweeperDAO" isExternal>
      Twitter
    </ChakraLink>
    <FooterDivider />
    <ChakraLink href="https://www.paymagic.xyz" isExternal>
      Built by Paymagic
    </ChakraLink>
  </>
);

export default function Footer() {
  return (
    <Box
      as="footer"
      role="contentinfo"
      m="0"
      w="100%"
      py="12"
      px={{ base: "4", md: "8" }}
      bg={mode("purple.50", "purple.800")}
    >
      <Divider mt="6" mb="2" />
      <Stack
        color="grey"
        direction={{ base: "column", md: "row" }}
        spacing="4"
        align="center"
        justify="center"
      >
        <FooterChildren />
      </Stack>
    </Box>
  );
}
