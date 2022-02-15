import Link from "next/link";
import { Heading, Image, Stack } from "@chakra-ui/react";
import * as React from "react";

export const Logo = () => {
  return (
    <Link href="/">
      <a>
        <Stack direction="row" alignItems="center">
          <Image src="/logo.png" alt="Paymagic" maxWidth="25vw" width="600px" />
        </Stack>
      </a>
    </Link>
  );
};
