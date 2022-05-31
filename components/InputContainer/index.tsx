import {
  Image,
  Container,
  Spacer,
  HStack,
  Text,
  Center,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import defaultLogo from "./Image.png";
import { FC } from "react";

interface Props {
  onClick: () => void;
  disabled: boolean;
}

const InputContainer: FC<Props> = ({ disabled, onClick, children }) => {
  return (
    <Center
      transition="200ms"
      onClick={onClick}
      alignItems="center"
      _hover={
        !disabled && {
          bg: "input.hover",
          cursor: "pointer",
        }
      }
      h="56px"
      opacity={disabled ? 0.5 : 1}
      bg={disabled ? "input.inactive" : "input.active"}
      borderRadius="input"
      w="full"
      m="8px"
    >
      <HStack w="full" px="14px">
        {children}
      </HStack>
    </Center>
  );
};

export default InputContainer;
