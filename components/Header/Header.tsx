import * as React from "react";
import { Logo } from "./Logo";
import Wallet from "./Wallet";
import {
  Center,
  Container,
  useColorModeValue as mode,
  Flex,
  HStack,
  IconButton,
  Spacer,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  useColorModeValue,
  useDisclosure,
  CloseButton,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";

export const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen: false });
  return (
    <>
      <Flex
        py={4}
        px={{ base: 4, md: 6, lg: 8 }}
        bg={useColorModeValue("purple.50", "purple.800")}
        boxShadow={useColorModeValue("md", "none")}
        borderBottomWidth={useColorModeValue("none", "1px")}
      >
        <Center marginEnd="10">
          <Logo />
        </Center>
        <HStack spacing={3} display={{ base: "none", md: "flex" }}></HStack>
        <Spacer />
        <HStack display={{ base: "none", md: "flex" }} spacing={3}>
          <Wallet />
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
              <Wallet />
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Flex>
    </>
  );
};
