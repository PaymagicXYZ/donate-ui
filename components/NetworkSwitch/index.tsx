import {
  Menu,
  MenuButton,
  Button,
  Flex,
  MenuList,
  Text,
  MenuItem,
  Box,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
// import ethLogo from './assets/eth_logo.png'
import { FC } from "react";
import NextLink from "next/link";
import ethereumLogo from "./assets/eth_logo.png";
import polygonLogo from "./assets/polygon_logo.png";
import avalancheLogo from "./assets/avalanche_logo.png";
import styled from "@emotion/styled";

import Image, { ImageProps } from "next/image";

const NetworkLogo = (props: ImageProps) => (
  <Flex style={{ marginRight: 7 }}>
    <Image width={20} height={20} {...props} />
  </Flex>
);

const LocaleLink: FC<{ locale: string }> = ({ locale, children }) => {
  return (
    <NextLink href="#" passHref locale={locale}>
      {children}
    </NextLink>
  );
};

const NetworkMenu = () => {
  return (
    /* Language Menu */
    <Menu>
      <MenuButton
        as={Button}
        // bg="ukraineYellow"
        color="black"
        _hover={{
          bg: "darkYellow",
        }}
        _active={{
          bg: "darkYellow",
        }}
        rounded="full"
        py="3"
      >
        <Flex alignItems="center">
          <Text>Ethereum</Text>
          <ChevronDownIcon className="w-6 h-6 ml-2" />
        </Flex>
      </MenuButton>
      <MenuList bg="ukraineYellow" color="black">
        <LocaleLink locale="en">
          <MenuItem>
            <NetworkLogo src={ethereumLogo} />
            <Text>Ethereum</Text>
          </MenuItem>
        </LocaleLink>
        <LocaleLink locale="fr">
          <MenuItem>
            <NetworkLogo src={polygonLogo} />
            <Text>Polygon</Text>
          </MenuItem>
        </LocaleLink>
        <LocaleLink locale="de">
          <MenuItem>
            <NetworkLogo src={avalancheLogo} />
            <Text>Avalanche</Text>
          </MenuItem>
        </LocaleLink>
      </MenuList>
    </Menu>
  );
};

export default NetworkMenu;
