import Link from "next/link";
import {
  Divider,
  Flex,
  Heading,
  Spacer,
  Image,
  HStack,
  Wrap,
  Box,
} from "@chakra-ui/react";

function Footer() {
  return (
    <>
      <Divider mb={5} />
      <Flex p={7} flexWrap="wrap" justifyContent="center">
        <HStack spacing="24px">
          <Link href="https://t.me/paymagics">
            <a>
              <Image src="telegram.png" alt="telegram" />
            </a>
          </Link>
          <Link href="https://twitter.com/paymagic_">
            <a>
              <Image src="twitter.png" alt="twitter" />
            </a>
          </Link>
        </HStack>
      </Flex>
    </>
  );
}

export default Footer;
