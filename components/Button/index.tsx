import { Button, ButtonProps } from "@chakra-ui/react";
import { FC } from "react";

interface Props extends ButtonProps {
  onClick: () => void;
}

const ButtonComponent: FC<Props> = (props) => {
  return (
    <Button
      borderRadius="input"
      __css={{
        background: props.isDark
          ? "rgba(26, 25, 29, 1)"
          : "linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), linear-gradient(270deg, #F6677C 0%, #F58C61 100%);",
      }}
      px="24px"
      py="10px"
      color="white"
      fontSize="18px"
      lineHeight="28px"
      {...props}
      h="48px"
      onClick={props.onClick}
      _disabled={{
        cursor: "initial",
        opacity: "25%",
      }}
      _active={
        props.isDisabled && {
          bgGradient:
            "linear(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2), 270deg), linear(270deg, #F6677C 0%, #F58C61 100%)",
        }
      }
      _hover={
        !props.isDisabled && {
          bgGradient: props.isDark
            ? "rgba(0, 0, 0, 1)"
            : "linear(270deg, #F6677C 0%, #F58C61 100%)",
        }
      }
    >
      {props.children}
    </Button>
  );
};

export default ButtonComponent;
