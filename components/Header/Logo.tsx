import Link from "next/link";
import { Stack, Text } from "@chakra-ui/react";
import * as React from "react";

export const Logo = () => {
  return (
    <Link href="/">
      <a>
        <Stack direction="row" alignItems="center">
          <Text letterSpacing={3}>EthGives.to</Text>
        </Stack>
      </a>
    </Link>
  );
};
