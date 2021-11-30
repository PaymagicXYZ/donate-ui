import Link from "next/link";
import {
  Heading,
  Image,
  Stack,
} from "@chakra-ui/react";
import * as React from 'react'

export const Logo = () => {
  return (
        <Link href="/">
          <a>
            <Stack direction="row" alignItems="center">
              <Image
                src="/logo_512x512.png"
                alt="Paymagic"
                boxSize="48px"
                objectFit="cover"
                borderRadius="50%"
              />
              <Heading as="h1" size="lg" isTruncated>
                Paymagic
              </Heading>
            </Stack>
          </a>
        </Link>
  )
}
