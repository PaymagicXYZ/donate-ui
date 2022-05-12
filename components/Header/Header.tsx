import * as React from "react";
import { Logo } from "./Logo";
import Account from "../Account";
import NetworkSwitch from "../NetworkSwitch";
import {
  Center,
  useColorModeValue as mode,
  Flex,
  HStack,
  IconButton,
  Spacer,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useNetwork } from "@usedapp/core";

export const Header = () => {
  const {
    network: { chainId },
  } = useNetwork();
  const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen: false });
  return (
    <>
      <Flex
        py={4}
        px={{ base: 4, md: 6, lg: 8 }}
        bg={useColorModeValue("purple.50", "purple.800")}
        borderBottomWidth={useColorModeValue("none", "1px")}
      >
        <Center marginEnd="10">
          <Logo />
        </Center>
        <Spacer />
        <HStack display={{ base: "none", md: "flex" }} spacing={4}>
          {chainId && <NetworkSwitch />}
          <Account />
        </HStack>
        <IconButton
          display={{ base: "flex", md: "none" }}
          size="sm"
          aria-label="Open menu"
          fontSize="20px"
          variant="ghost"
          onClick={onOpen}
          icon={<HamburgerIcon />}
        />
        <Drawer placement="top" onClose={onClose} isOpen={isOpen}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerHeader borderBottomWidth="1px">Menu</DrawerHeader>
            <DrawerBody>
              <Account />
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Flex>
    </>
  );
};
