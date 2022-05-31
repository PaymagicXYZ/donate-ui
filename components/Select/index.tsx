import { Image, Spacer, Text } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import defaultLogo from "./Image.png";
import InputContainer from "../InputContainer";

interface Props {
  onClick: () => void;
  placeHolderText: string;
  value?: string;
  logoURI?: string;
  disabled: boolean;
}

export default function Select(props: Props) {
  const { disabled, value, placeHolderText, logoURI, onClick } = props;
  return (
    <InputContainer onClick={disabled ? null : onClick} disabled={disabled}>
      <Image
        borderRadius="full"
        width="26px"
        height="26px"
        src={logoURI || defaultLogo.src}
      />
      <Text
        _hover={{ cursor: "default" }}
        fontSize="select"
        fontWeight={400}
        color="text"
      >
        {value || placeHolderText}
      </Text>
      <Spacer />
      <ChevronDownIcon color="text" fontSize={23} />
    </InputContainer>
  );
}
