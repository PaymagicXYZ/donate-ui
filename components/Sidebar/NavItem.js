import { Box, HStack } from "@chakra-ui/react";
import * as React from "react";
import { BsCaretRightFill } from "react-icons/bs";

export const NavItem = (props) => {
  const { active, subtle, icon, children, label, endElement, isDisabled } = props;
  return (
    <HStack
      w="full"
      px="3"
      py="2"
      cursor={isDisabled ? "not-allowed" : "pointer"}
      userSelect="none"
      rounded="md"
      transition="all 0.2s"
      bg={active ? "gray.700" : undefined}
      _hover={{
        bg: isDisabled ? undefined : "gray.700",
      }}
      _active={{
        bg: isDisabled ? undefined : "gray.600",
      }}
    >
      <Box fontSize="lg" color={active ? "currentcolor" : (isDisabled ? "gray.600" : "gray.400")}>
        {icon}
      </Box>
      <Box
        flex="1"
        fontWeight="inherit"
        color={(subtle || isDisabled) ? "gray.600" : undefined}
      >
        {label}
      </Box>
      {endElement && !children && <Box>{endElement}</Box>}
      {children && <Box fontSize="xs" flexShrink={0} as={BsCaretRightFill} />}
    </HStack>
  );
};
