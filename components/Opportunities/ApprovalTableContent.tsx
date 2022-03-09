import { useState } from "react";
import _ from "lodash";
import { Text, Badge, Link, useColorModeValue as mode } from "@chakra-ui/react";
import { SimpleTable } from "../Table/SimpleTable";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import numeral from "numeral";
import TokenDisplay from "../TokenDisplay";
import TokenAmountDisplay from "../TokenAmountDisplay";
import { useTranslation } from "next-i18next";
import {
  shortenAddress,
  shortenTx,
  getBlockExplorerLink,
  displayISODatetime,
} from "../../utils";
const logoUrl = (contract) =>
  `https://logos.covalenthq.com/tokens/${contract}.png`;

export function ApprovalTableContent(props) {
  const { approvalList } = props;
  const { t } = useTranslation("common");

  const cols = [
    {
      Header: t("order.cols.time"),
      accessor: "time",
      Cell: ({ value }) => (
        <Text fontWeight="medium">{displayISODatetime(value)}</Text>
      ),
    },
    {
      Header: t("order.cols.youGet"),
      accessor: "balance",
      Cell: ({ value }) => <Text fontWeight="medium">{Number(value)}</Text>,
    },
    {
      Header: t("order.cols.token"),
      accessor: "token",
      Cell: ({ value }) => (
        <TokenDisplay symbol={value[0]} imageUrl={logoUrl(value[1])} />
      ),
    },
    {
      Header: t("order.cols.tx"),
      accessor: "tx",
      Cell: ({ value }) => (
        <Link isExternal href={getBlockExplorerLink(value, "transaction")}>
          {shortenTx(value)}
        </Link>
      ),
    },
    {
      Header: t("order.cols.maker"),
      accessor: "maker",
      Cell: ({ value }) => (
        <Link isExternal href={getBlockExplorerLink(value, "address")}>
          {shortenAddress(value)}
        </Link>
      ),
    },
  ];

  return <SimpleTable columns={cols} data={approvalList} />;
}
