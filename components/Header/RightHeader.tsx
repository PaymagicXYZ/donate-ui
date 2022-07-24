import { Flex, Text } from "@chakra-ui/react";
import Button from "../Button";
import { useRouter } from "next/router";
import Link from "next/link";
import DevModeSwitch from "../DevModeSwitch";
import Account from "../Account";

export const RightHeader = () => {
  const { pathname, query } = useRouter();
  const isHome = pathname === "/";
  const isDonating = !!query.cause;

  return (
    <Flex justify="flex-end" w="full" marginBottom="60px">
      {isDonating && <DevModeSwitch />}
      {isHome && (
        <Link href="/create" passHref>
          <Button borderRadius="accountBtn" marginRight="16px">
            <Text fontWeight={700}>+ Create a link</Text>
          </Button>
        </Link>
      )}
      <Account isDark={!isDonating} />
    </Flex>
  );
};
