import { Box, Center, Text } from "@chakra-ui/react";
import { CustomTable } from "../Table/CustomTable";
import { ethers } from "ethers";
import numeral from "numeral";
import TokenDisplay from "../TokenDisplay";
import TokenAmountDisplay from "../TokenAmountDisplay";
import { displayISODatetime } from "../../utils";
import { useTranslation } from "next-i18next";

export default function BalanceTable(props) {
  const { balances, signedTokens, signedTokensCallback } = props;
  const { t } = useTranslation("common");
  const cols = [
    {
      Header: t("clean.cols.token"),
      accessor: "symbol",
      Cell: ({ value }) => (
        <TokenDisplay imageUrl={value[1]} symbol={String(value[0])} />
      ),
    },

    {
      Header: t("clean.cols.price"),
      accessor: "quote_rate",
      Cell: ({ value }) => numeral(value).format("$0,0.00"),
    },

    {
      Header: t("clean.cols.lastTransferred"),
      accessor: "last_transferred_at",
      Cell: ({ value }) => <Text>{displayISODatetime(value)}</Text>,
    },

    {
      Header: t("clean.cols.balance"),
      accessor: "balance",
      Cell: ({ value }) => (
        <TokenAmountDisplay
          amountUsd={value[0]}
          amountTokens={ethers.utils.formatUnits(value[1], value[2])}
          symbol={value[3]}
        />
      ),
    },

    {
      Header: t("clean.cols.youReceiveInETH"),
      accessor: "balanceETH",
      Cell: ({ value }) =>
        value == null ? null : (
          <Center>
            <TokenAmountDisplay amountUsd={value[0]} amountEth={value[1]} />
          </Center>
        ),
    },
  ];

  return (
    <Box py={{ base: "2", md: "4" }}>
      <CustomTable
        columns={cols}
        data={balances}
        {...{ signedTokensCallback, signedTokens }}
      />
    </Box>
  );
}
