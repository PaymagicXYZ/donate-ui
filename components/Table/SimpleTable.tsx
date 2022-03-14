import _ from "lodash";
import {
  Badge,
  Button,
  Center,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Tooltip,
  useColorModeValue as mode,
  Link,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
// import { FiSend, FiToggleLeft } from "react-icons/fi";
import { ArrowUpIcon, ArrowDownIcon } from "@chakra-ui/icons";
import { useTable, usePagination, useSortBy, useRowSelect } from "react-table";
import { Pagination } from "./Pagination";
// import tokensData from "../CleanWallet/tokens.json";

// const tokenAddresses = tokensData.tokens.map((i) => i.symbol);

export function SimpleTable({ columns, data }) {
  // const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    useSortBy,
    usePagination
  );
  return (
    <VStack width="780px" overflow="scroll">
      <Table borderWidth="1px" fontSize="sm" {...getTableProps()}>
        <Thead bg={mode("gray.50", "gray.800")}>
          {headerGroups.map((headerGroup, i) => (
            <Tr {...headerGroup.getHeaderGroupProps()} key={i}>
              {headerGroup.headers.map((column, i) => (
                <Th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  key={i}
                >
                  {column.render("Header")}
                  {/* Add a sort direction indicator */}
                  <span>
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <ArrowDownIcon />
                      ) : (
                        <ArrowUpIcon />
                      )
                    ) : (
                      ""
                    )}
                  </span>
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {page.length > 0 ? (
            page.map((row, i) => {
              prepareRow(row);
              return (
                <Tr {...row.getRowProps()} key={i}>
                  {row.cells.map((cell, i) => {
                    return cell.column.Header === "YOU RECEIVE IN ETH" &&
                      cell.value ? (
                      <Td
                        backgroundColor="green.100"
                        {...cell.getCellProps()}
                        key={i}
                      >
                        {cell.render("Cell")}
                      </Td>
                    ) : (
                      <Td {...cell.getCellProps()} key={i}>
                        {cell.render("Cell")}
                      </Td>
                    );
                  })}
                </Tr>
              );
            })
          ) : (
            <Center p={6}>
              <Text as="i">No data found</Text>
            </Center>
          )}
        </Tbody>
      </Table>
      <Pagination
        {...{
          canPreviousPage,
          canNextPage,
          pageOptions,
          pageCount,
          gotoPage,
          nextPage,
          previousPage,
          setPageSize,
          pageIndex,
          pageSize,
        }}
      />
    </VStack>
  );
}
