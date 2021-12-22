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
import { cols } from "./_data";

export function ListContent(props) {
  const { walletData } = props;
  return (
    <Table borderWidth="1px" fontSize="sm">
      <Thead bg={mode("gray.50", "gray.800")}>
        <Tr>
          {cols.map((column, index) => (
            <Th whiteSpace="nowrap" scope="col" key={index}>
              {column.Header}
            </Th>
          ))}
          <Th />
        </Tr>
      </Thead>
      <Tbody>
        {_.isEmpty(walletData.assets) ? (
          <Center p={6}>
            <Text as="i">No data found</Text>
          </Center>
        ) : (
          walletData.assets.map((row, index) => (
            <Tr key={index}>
              {cols.map((column, index) => {
                const cell = row[column.accessor as keyof typeof row];
                const element = column.Cell?.(cell) ?? cell;
                return (
                  <Td whiteSpace="nowrap" key={index}>
                    {element}
                  </Td>
                );
              })}
            </Tr>
          ))
        )}
      </Tbody>
    </Table>
  );
}
