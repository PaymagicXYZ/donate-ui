import { HStack } from "@chakra-ui/react";
import Account from "../Account";
import CauseLink from "../CauseLink";
import DevModeSwitch from "../DevModeSwitch";
import Button from "../Button";
import { useRouter } from "next/router";
import Link from "next/link";

const Header = () => {
  const { pathname } = useRouter();
  const isHome = pathname === "/";
  return (
    <HStack w="full" px="140px" py="60px" position="fixed">
      <CauseLink />
      {!isHome && process.env.NEXT_PUBLIC_DEBUG && <DevModeSwitch />}
      {isHome && (
        <Link href="/create" passHref>
          <Button borderRadius="accountBtn">Create Cause</Button>
        </Link>
      )}
      <Account />
    </HStack>
  );
};

export default Header;
