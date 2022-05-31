import { Text, TextProps } from "@chakra-ui/react";
import { FC } from "react";

const DonationDetailText: FC<TextProps> = (props) => (
  <Text color="text" opacity={0.5}>
    {props.children}
  </Text>
);

export default DonationDetailText;
