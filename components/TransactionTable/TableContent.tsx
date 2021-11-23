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
  useColorModeValue as mode,
} from '@chakra-ui/react'
import { useState } from 'react'
import { useWeb3React } from "@web3-react/core";
import { useZapper } from "../../hooks/useZapper";

import { cols, columns, data } from './_data'

export function TableContent(props) {
  const { library, account, chainId } = useWeb3React();
  const [loading, setLoading] = useState(false);

  const walletData = useZapper('0x869eC00FA1DC112917c781942Cc01c68521c415e', 'ethereum');
  console.log('account', account)
  console.log('walletData', walletData)

  // const [alert, setAlert] = useState(<></>);
  // const [txData, setTxData] = useState({});
  // const [status, setStatus] = useState(1);

  if(walletData.loading) {
    return (
      <Center>
        <Spinner size="xl" />
      </Center>
    )
  }

  return (
    <>
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
        {walletData.txs.map((row, index) => (
          <Tr key={index}>
            {cols.map((column, index) => {
              const cell = row[column.accessor as keyof typeof row]
              const element = column.Cell?.(cell) ?? cell
              return (
                <Td whiteSpace="nowrap" key={index}>
                  {element}
                </Td>
              )
            })}
          </Tr>
        ))}
      </Tbody>
    </Table>
    <Table my="8" borderWidth="1px" fontSize="sm">
      <Thead bg={mode('gray.50', 'gray.800')}>
        <Tr>
          {columns.map((column, index) => (
            <Th whiteSpace="nowrap" scope="col" key={index}>
              {column.Header}
            </Th>
          ))}
          <Th />
        </Tr>
      </Thead>
      <Tbody>
        {data.map((row, index) => (
          <Tr key={index}>
            {columns.map((column, index) => {
              const cell = row[column.accessor as keyof typeof row]
              const element = column.Cell?.(cell) ?? cell
              return (
                <Td whiteSpace="nowrap" key={index}>
                  {element}
                </Td>
              )
            })}
          </Tr>
        ))}
      </Tbody>
    </Table>
    </>
  )
}
