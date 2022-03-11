import _ from "lodash";
import { useState, useMemo, useCallback, useEffect } from "react";
import { Button, Center, VStack } from "@chakra-ui/react";
import BalanceTable from "./BalanceTable";
import tokensData from "./tokens.json";
const ethers = require("ethers");
import ERC20ABI from "../../artifacts/contracts/TestERC20.sol/ERC20.json";
const provider = ethers.getDefaultProvider(
  "https://mainnet.infura.io/v3/f3c58d461e4e4bc7860f2a562ca71f10"
);

export function ApprovalForm(props) {
  const { covalentData, account } = props;
  // console.log(covalentData);
  const [signedTokens, setSignedTokens] = useState([]);
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
    let Txs = [];
    try {
      if (covalentData.transactions.data.items) {
        Txs = covalentData.transactions?.data.items
          .map((Tx) => [Tx.log_events])
          .flat(2)
          .map((e) => [
            e.decoded.name,
            e.decoded.params[1].value,
            e.sender_contract_ticker_symbol,
            e.tx_hash,
          ])
          .filter(
            (e) =>
              e[0] === "Approval" &&
              e[1] === "0xbbcb5065c3c3963f9f149e441e66b673fc0c0e40"
          );
      }
    } catch (error) {
      console.log(error);
    }

    // console.log(Txs);
    // console.log(covalentData.transactions);

    let ethPrice;
    sortedItems.forEach((item) => {
      if (item.contract_ticker_symbol === "ETH") {
        ethPrice = item.quote_rate;
      }
    });
    const data = sortedItems.map((asset) => {
      if (asset.contract_ticker_symbol !== "ETH") {
        let signed = _.includes(
          signedTokens?.map((token) => token.name),
          asset.contract_ticker_symbol
        );
        try {
          signed =
            signed || _.includes(Txs.flat(), asset.contract_ticker_symbol);
        } catch (error) {
          console.log(error);
        }
        return {
          symbol: [
            asset.contract_ticker_symbol,
            asset.logo_url,
            asset.contract_address,
            signed,
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
              : [asset.quote * 0.7, (asset.quote * 0.7) / ethPrice],
        };
      }
    });

    return data.filter((a) => a);
  }, [covalentData, signedTokens]);

  balances.map(async (data) => {
    const contract = new ethers.Contract(data.symbol[2], ERC20ABI, provider);
    const allowance = await contract.allowance(
      account,
      "0xbbcb5065c3c3963f9f149e441e66b673fc0c0e40"
    );
    data.symbol[3] = allowance != 0;
  });

  const signedTokensCallback = useCallback((hash) => {
    setSignedTokens(hash);
  }, []);
  // console.log(balances);
  return (
    <Center>
      <BalanceTable {...{ balances, signedTokens, signedTokensCallback }} />
      {/* <pre>{JSON.stringify(signedTokens?.map((token) => token.name))}</pre> */}
      {/* {console.log(signedTokens)} */}
    </Center>
  );
}
