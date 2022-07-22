import {
  Container,
  Grid,
  GridItem,
  Flex,
  HStack,
  Text,
  Center,
  FormControl,
  FormLabel,
  Switch,
} from "@chakra-ui/react";
import Header from "../Header";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default Layout;
