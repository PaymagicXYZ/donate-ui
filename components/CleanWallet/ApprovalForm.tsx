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

    let ethPrice;
    sortedItems.forEach((item) => {
      if (item.contract_ticker_symbol === "ETH") {
        ethPrice = item.quote_rate;
      }
    });
    const data = sortedItems.map((asset) => {
      if (asset.contract_ticker_symbol !== "ETH") {
        return {
          symbol: [
            asset.contract_ticker_symbol,
            asset.logo_url,
            asset.contract_address,
            null,
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
      }
    });
    return data.filter((a) => a);
  }, [covalentData]);
  console.log(balances);
  return (
    <Center>
      <BalanceTable {...{ balances }} />
    </Center>
  );
}
