import _ from "lodash";
import { useState, useMemo } from "react";
import { Button, Center, VStack } from "@chakra-ui/react";
import BalanceTable from "./BalanceTable";
import tokensData from "./tokens.json";

export function ApprovalForm(props) {
  const { covalentData } = props;
  const balances = useMemo(() => {
    const items = _.get(covalentData, "balance.data.items", []);
    const validBalances = _.filter(items, (i) => {
      return i.quote > 5;
    });
    const tokenAddresses = tokensData.tokens.map((i) => i.address);
    const sortedItems = _.sortBy(validBalances, [
      function (o) {
        return !_.includes(tokenAddresses, o.contract_address);
      },
    ]);
    const ethPrice = covalentData.balance.data.items[0].quote_rate;
    const data = sortedItems.map((asset) => {
      return {
        symbol: [
          asset.contract_ticker_symbol,
          asset.logo_url,
          asset.contract_address,
        ],
        quote_rate: asset.quote_rate,
        last_transferred_at: asset.last_transferred_at,
        balance: [
          asset.quote,
          asset.balance,
          asset.contract_decimals,
          asset.contract_ticker_symbol,
        ],
        balanceETH:
          asset.contract_ticker_symbol == "ETH"
            ? null
            : [asset.quote * 0.9, (asset.quote * 0.9) / ethPrice],
      };
    });
    return data;
  }, [covalentData]);
  return (
    <Center>
      <BalanceTable {...{ balances }} />
    </Center>
  );
}
