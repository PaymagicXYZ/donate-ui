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
      bg="badge.selected"
      opacity={0.5}
      _disabled={{
        opacity: 0.25,
      }}
      _hover={{
        cursor: "pointer",
        opacity: 1,
      }}
      onClick={onClick}
    >
      {children}
    </Badge>
  );
};

export default BadgeComponent;
