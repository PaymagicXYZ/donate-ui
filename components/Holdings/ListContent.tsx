import { useState } from "react";
import _ from "lodash";
import {
  Button,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Center,
  Spinner,
  Text,
  useColorModeValue as mode,
} from "@chakra-ui/react";

export function ListContent(props) {
  const { walletData } = props;
  console.log(walletData);
  return (
    <Table borderWidth="1px" fontSize="sm">
      {_.isEmpty(walletData.assets) ? (
        <Center p={6}>
          <Text as="i">No data found</Text>
        </Center>
      ) : (
        <Text>Data Loaded in Console</Text>
      )}
    </Table>
  );
}
