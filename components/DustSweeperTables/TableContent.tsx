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
  Checkbox,
  useColorModeValue as mode,
} from '@chakra-ui/react'
import { cols } from './_columns'

export function TableContent(props) {
  return (
    <Table borderWidth="1px" fontSize="sm">
      <Thead bg={mode('gray.50', 'gray.800')}>
        <Tr>
          <Th whiteSpace="nowrap" scope="col" key={-1}>
            {''}
          </Th>
          {cols.map((column, index) => (
            <Th whiteSpace="nowrap" scope="col" key={index}>
              {column.Header}
            </Th>
          ))}
        </Tr>
      </Thead>
      <Tbody>


        {_.isEmpty(props.walletData) ? 
          (<Center p={6}><Text as="i">No data found</Text></Center>) :
          props.walletData.map((row, index) => (
            <Tr key={index}>
              <Td key={index}>
                <Checkbox
                  colorScheme='purple'
                  isChecked={props.selectedIndices[index]}

                  onChange={event => {
                    let tmp = props.selectedIndices
                    tmp[index] = !props.selectedIndices[index]
                    props.handleChange(tmp)
                  }}

                ></Checkbox>
              </Td>
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
