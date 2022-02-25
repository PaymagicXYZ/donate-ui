import _ from "lodash";
import { useState, useMemo } from "react";
import { Button, Center, VStack } from "@chakra-ui/react";
import { FiSend, FiToggleLeft } from "react-icons/fi";
import BalanceTable from "./BalanceTable";
import tokensData from "./tokens.json";

export function ApprovalForm(props) {
  const { covalentData, isOpen, onOpen } = props;
  const [selectedIndices, setSelectedIndices] = useState({});
  const [tokenApprovals, setTokenApprovals] = useState([]);
  console.log(selectedIndices);
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
        symbol: [asset.contract_ticker_symbol, asset.logo_url],
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
      <VStack>
        <BalanceTable {...{ balances, setSelectedIndices }} />
        <Button
          size="lg"
          fontWeight="normal"
          colorScheme="purple"
          type="submit"
          value="Submit"
          leftIcon={<FiToggleLeft />}
          isDisabled={isOpen || _.isEmpty(tokenApprovals)}
          isLoading={isOpen}
          loadingText="Sign txs"
          onClick={onOpen}
        >
          Approve Selected Tokens
        </Button>
      </VStack>
    </Center>
  );
}
