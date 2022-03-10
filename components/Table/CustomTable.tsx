import _ from "lodash";
import { useState } from "react";
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
import { FiSend, FiToggleLeft } from "react-icons/fi";
import { ArrowUpIcon, ArrowDownIcon } from "@chakra-ui/icons";
import { useTable, usePagination, useSortBy, useRowSelect } from "react-table";
import { Pagination } from "./Pagination";
import IndeterminateCheckbox from "./Checkbox";
import { InfoIcon } from "@chakra-ui/icons";
import tokensData from "../CleanWallet/tokens.json";
import { ApprovalModal } from "../CleanWallet/ApprovalModal";
const tokenAddresses = tokensData.tokens.map((i) => i.symbol);
import { useTranslation } from "next-i18next";

export function CustomTable({
  columns,
  data,
  signedTokensCallback,
  signedTokens,
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { t } = useTranslation("common");
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
          Header: t("clean.SELECT"),
          // The cell can use the individual row's getToggleRowSelectedProps method
          // to the render a checkbox
          Cell: ({ row }) => (
            <Center>
              {row.cells[1].value[3] ? (
                <Badge colorScheme="green">{t("clean.badges.approved")}</Badge>
              ) : _.includes(tokenAddresses, row.cells[1].value[0]) ? (
                <IndeterminateCheckbox
                  colorScheme="purple"
                  {...row.getToggleRowSelectedProps()}
                />
              ) : (
                <Badge>{t("clean.badges.notSupported")}</Badge>
              )}
            </Center>
          ),
        },
        ...columns,
      ]);
    }
  );

  return (
    <VStack>
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
                    {i + 1 == headerGroup.headers.length && (
                      <Tooltip label={t("clean.toolTips")} fontSize="md">
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
                    return cell.column.id === "balanceETH" && cell.value ? (
                      <Td
                        backgroundColor="green.100"
                        {...cell.getCellProps()}
                        key={i}
                      >
                        {/* {_.includes(
                          signedTokens?.map((token) => token.name),
                          cell.row.cells[1].value[0]
                        ) ? (
                          <Text>Signed</Text>
                        ) : ( */}
                        {cell.render("Cell")}
                        {/* )} */}
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
      <Button
        size="lg"
        fontWeight="normal"
        colorScheme="purple"
        type="submit"
        value="Submit"
        leftIcon={<FiToggleLeft />}
        isDisabled={isOpen || _.isEmpty(selectedRowIds)}
        isLoading={isOpen}
        loadingText="Sign txs"
        onClick={onOpen}
      >
        Approve Selected Tokens
      </Button>
      <ApprovalModal
        {...{
          isOpen,
          onOpen,
          onClose,
          selectedFlatRows,
          signedTokens,
          signedTokensCallback,
        }}
      />
    </VStack>
  );
}
