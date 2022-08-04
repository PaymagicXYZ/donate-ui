import { Flex, Text } from "@chakra-ui/react";
import Button from "../Button";
import { useRouter } from "next/router";
import DevModeSwitch from "../DevModeSwitch";
import Account from "../Account";

export const RightHeader = () => {
  const { pathname, query, push } = useRouter();
  const isHome = pathname === "/";
  const isDonating = !!query.cause;

  return (
    <Flex justify="flex-end" w="full" marginBottom="60px">
      {isDonating && <DevModeSwitch />}
      {isHome && (
        <Button
          borderRadius="accountBtn"
          marginRight="16px"
          onClick={() => push("/create")}
        >
          <Text fontWeight={700}>+ Create a link</Text>
        </Button>
      )}
      <Account isDark={!isDonating} />
    </Flex>
  );
};
