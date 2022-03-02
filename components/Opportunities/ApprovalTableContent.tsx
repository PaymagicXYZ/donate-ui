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
import { cols } from "./_approvalTableColumns";
import { SimpleTable } from "../Table/SimpleTable";

export function ApprovalTableContent(props) {
  const { approvalList } = props;

  // console.log(approvalList)

  return <SimpleTable columns={cols} data={approvalList} />;
}
