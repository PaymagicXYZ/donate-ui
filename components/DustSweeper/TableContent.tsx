import { useState, useEffect, useMemo } from 'react'
import _ from 'lodash';
import {
  Button,
  Badge,
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
  Tooltip,
  useColorModeValue as mode,
} from '@chakra-ui/react'
import { InfoIcon } from '@chakra-ui/icons'
import { cols } from './_columns'
import * as tokensData from './tokens.json'






export function TableContent(props) {
  const [tokenRows, setTokenRows] = useState([]);

  const tokenAddresses = useMemo(() => {
    return tokensData.tokens.map(i => {
      return i.address
    })
  }, []);

  useEffect(() => {
    const tmp = _.sortBy(props.walletData, [function(o) { return !_.includes(tokenAddresses, o.contract_address) }]);

    setTokenRows(tmp)

  },[props.walletData])


  return (
    <Table borderWidth="1px" fontSize="sm">
      <Thead bg={mode('gray.50', 'gray.800')}>
        <Tr>
          <Th whiteSpace="nowrap" scope="col" key={-1}>
            <Center>
              {'SELECT'}
            </Center>
          </Th>
          {cols.map((column, index) => (
            <Th whiteSpace="nowrap" scope="col" key={index}>
              {column.Header}

              {column.accessor === 'balanceETH' && <Tooltip label='Token Balance at ChainLink Market Price with 10% discount' fontSize='md'>
                <InfoIcon w={4} h={4} ml='1'/>
              </Tooltip>}

            </Th>
          ))}
        </Tr>
      </Thead>
      <Tbody>


        {_.isEmpty(tokenRows) ? 
          (<Center p={6}><Text as="i">No data found</Text></Center>) :
          tokenRows.map((row, index) => (
            <Tr key={index}>
              <Td key={index}>
                <Center>
                  {!_.includes(tokenAddresses, row.contract_address) ?
                    <Badge>Not Supported</Badge> :
                    <Checkbox
                      colorScheme='purple'
                      isChecked={props.selectedIndices[index]}

                      onChange={event => {
                        let tmp = props.selectedIndices
                        tmp[index] = !props.selectedIndices[index]
                        props.handleChange(tmp)
                      }}
                    ></Checkbox>
                  }
                </Center>
              </Td>
              {cols.map((column, index) => {
                const cell = row[column.accessor as keyof typeof row]
                const element = column.Cell?.(row) ?? cell
                return (
                  <Td key={index} backgroundColor={column.accessor === 'balanceETH' ? "green.100": null}>
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
