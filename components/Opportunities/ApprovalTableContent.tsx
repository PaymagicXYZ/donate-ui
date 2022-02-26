import { useState } from 'react'
import _ from 'lodash';
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
} from '@chakra-ui/react'
import { cols } from './_approvalTableColumns'

export function ApprovalTableContent(props) {
  const { approvalList } = props

  // console.log(approvalList)

  return (
    <Table borderWidth="1px" fontSize="sm">
      <Thead bg={mode('gray.50', 'gray.800')}>
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


        {_.isEmpty(approvalList) ? 
          (<Center p={6}><Text as="i">No data found</Text></Center>) :
          approvalList.map((row, index) => (
            <Tr key={index}>
              {cols.map((column, index) => {
                const cell = row[column.accessor as keyof typeof row]
                const element = column.Cell?.(row) ?? cell
                return (
                  <Td key={index}>
                    {element}
                  </Td>
                )
              })}
            </Tr>
          ))
        }

      </Tbody>
    </Table>
  )
}
