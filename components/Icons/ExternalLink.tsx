import { Icon } from "@chakra-ui/react";

const ExternalLink = (props) => (
  <Icon fontSize="16px" viewBox="0 0 16 16">
    <path
      d="M10.6694 6.276L4.93144 12.014L3.98877 11.0713L9.7261 5.33333H4.66944V4H12.0028V11.3333H10.6694V6.276V6.276Z"
      fill={props.color || "white"}
    />
    {props.children}
  </Icon>
);

export default ExternalLink;
