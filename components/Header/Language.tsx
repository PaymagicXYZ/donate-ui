import {
  Button,
  Link,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
// import { useTranslation } from "next-i18next";

export function Language() {
  const router = useRouter();
  return (
    <Menu>
      {({ isOpen }) => (
        <>
          <MenuButton
            width="100%"
            isActive={isOpen}
            as={Button}
            rightIcon={<ChevronDownIcon />}
          >
            {isOpen ? "Back" : router.locale}
          </MenuButton>
          <MenuList>
            <Link href="/">
              <MenuItem>English</MenuItem>
            </Link>
            <Link href="/zh">
              <MenuItem>中文</MenuItem>
            </Link>
            <Link href="/de">
              <MenuItem>Deutsch</MenuItem>
            </Link>
            <Link href="/ko">
              <MenuItem>한글</MenuItem>
            </Link>
            <Link href="/ja">
              <MenuItem>日本語</MenuItem>
            </Link>
          </MenuList>
        </>
      )}
    </Menu>
  );
}
