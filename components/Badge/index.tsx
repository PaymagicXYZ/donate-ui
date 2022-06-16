import { Badge } from "@chakra-ui/react";
import { FC } from "react";

interface Props {
  onClick: () => void;
  disabled: boolean;
}

const BadgeComponent: FC<Props> = ({ onClick, disabled, children }) => {
  return (
    <Badge
      py="8px"
      px="10px"
      borderRadius="input"
      color="text"
      transition="200ms"
      bg="badge"
      opacity={disabled ? 0.25 : 0.5}
      _hover={
        !disabled && {
          cursor: "pointer",
          opacity: 0.9,
        }
      }
      onClick={disabled ? () => {} : onClick}
    >
      {children}
    </Badge>
  );
};

export default BadgeComponent;
