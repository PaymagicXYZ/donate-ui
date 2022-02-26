import { useMemo } from "react";
import _ from "lodash";
import { CustomTable } from "../Table/CustomTable";
import { cols } from "./_data";

export function ListContent(props) {
  const columns = useMemo(
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
