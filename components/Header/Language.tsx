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
  //   const { t, i18n } = useTranslation();

  //   const changeLanguage = (lng) => {
  //     i18n.changeLanguage(lng);
  //   };
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
            <MenuItem>
              <Link href="/">English</Link>
            </MenuItem>
            <MenuItem>
              <Link href="/zh">中文</Link>
            </MenuItem>
            <MenuItem>
              <Link href="/de">Deutsch</Link>
            </MenuItem>
            <MenuItem>
              <Link href="/ko">한글</Link>
            </MenuItem>
            <MenuItem>
              <Link href="/ja">日本語</Link>
            </MenuItem>
          </MenuList>
        </>
      )}
    </Menu>
  );
}
