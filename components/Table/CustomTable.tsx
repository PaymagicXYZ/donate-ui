import _ from "lodash";
import {
  Badge,
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
} from "@chakra-ui/react";
import { ArrowUpIcon, ArrowDownIcon } from "@chakra-ui/icons";
import { useTable, usePagination, useSortBy, useRowSelect } from "react-table";
import { Pagination } from "./Pagination";
import IndeterminateCheckbox from "./Checkbox";
import { InfoIcon } from "@chakra-ui/icons";
import tokensData from "../CleanWallet/tokens.json";

const tokenAddresses = tokensData.tokens.map((i) => i.symbol);

export function CustomTable({ columns, data }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    // rows,
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
    selectedFlatRows,
    state: { pageIndex, pageSize, selectedRowIds },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    useSortBy,
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        // Let's make a column for selection
        {
          id: "selection",
          // The header can use the table's getToggleAllRowsSelectedProps method
          // to render a checkbox
          Header: "SELECT",
          // The cell can use the individual row's getToggleRowSelectedProps method
          // to the render a checkbox
          Cell: ({ row }) => (
            <Center>
              {_.includes(tokenAddresses, row.cells[1].value[0]) ? (
                <IndeterminateCheckbox
                  colorScheme="purple"
                  {...row.getToggleRowSelectedProps()}
                />
              ) : (
                <Badge>Not Supported</Badge>
              )}
            </Center>
          ),
        },
        ...columns,
      ]);
    }
  );
  // setSelectedIndices(selectedRowIds);
  return (
    <>
      <Table borderWidth="1px" fontSize="sm" {...getTableProps()}>
        {/* {} */}
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
                    {column.Header === "YOU RECEIVE IN ETH" && (
                      <Tooltip
                        label="Token Balance at ChainLink Market Price with 10% discount"
                        fontSize="md"
                      >
                        <InfoIcon w={4} h={4} ml="1" />
                      </Tooltip>
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
    </>
  );
}
