import React from "react";
import _ from "lodash";
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { ArrowUpIcon, ArrowDownIcon } from "@chakra-ui/icons";
import {
  useTable,
  usePagination,
  useFilters,
  useSortBy,
  useGlobalFilter,
} from "react-table";
import { cols } from "./_data";
import { Pagination } from "./Table/Pagination";

function CustomTable({ columns, data }) {
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
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  // function SelectColumnFilter({
  //   column: { filterValue, setFilter, preFilteredRows, id },
  // }) {
  //   // Calculate the options for filtering
  //   // using the preFilteredRows
  //   const options: any[] = React.useMemo(() => {
  //     const options = new Set();
  //     preFilteredRows.forEach((row) => {
  //       options.add(row.values[id]);
  //     });
  //     return [...options.values()];
  //   }, [id, preFilteredRows]);

  //   // Render a multi-select box
  //   return (
  //     <select
  //       value={filterValue}
  //       onChange={(e) => {
  //         setFilter(e.target.value || undefined);
  //       }}
  //     >
  //       <option value="">All</option>
  //       {options.map((option, i) => (
  //         <option key={i} value={option}>
  //           {option}
  //         </option>
  //       ))}
  //     </select>
  //   );
  // }

  // function DefaultColumnFilter({
  //   column: { filterValue, preFilteredRows, setFilter },
  // }) {
  //   const count = preFilteredRows.length;

  //   return (
  //     <input
  //       value={filterValue || ""}
  //       onChange={(e) => {
  //         setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
  //       }}
  //       placeholder={`Search ${count} records...`}
  //     />
  //   );
  // }
  // Render the UI for your table
  return (
    <>
      <Table {...getTableProps()}>
        <Thead>
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
                  {/* Render the columns filter UI */}
                  {/* <div>{column.canFilter ? column.render("Filter") : null}</div> */}
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()} key={i}>
                {row.cells.map((cell, i) => {
                  return (
                    <Td {...cell.getCellProps()} key={i}>
                      {cell.render("Cell")}
                    </Td>
                  );
                })}
              </Tr>
            );
          })}
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

export function ListContent(props) {
  const columns = React.useMemo(
    () => [
      {
        Header: "Holdings",
        columns: cols,
      },
    ],
    []
  );

  const { walletData } = props;
  const data = walletData.map((asset) => {
    return {
      address: asset.contract_address,
      symbol: [asset.contract_ticker_symbol, asset.logo_url],
      type: asset.type,
      name: asset.contract_name,
      balance: asset.balance / 1000000000000000000,
      value: (asset.quote_rate * asset.balance) / 1000000000000000000,
    };
  });

  return <CustomTable columns={columns} data={data} />;
}
