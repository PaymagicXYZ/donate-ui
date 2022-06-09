import { useState, useEffect } from "react";
import { useEthers, useBlockNumber } from "@usedapp/core";
import { utils } from "ethers";
import _ from "lodash";
import axios from "axios";
import { COVALENT_API_KEY } from "../utils/constants";
import { useSupportedNetworks } from "./useSupportedNetworks";

export interface CovalentResponse {
  error: boolean;
  error_code: string | null;
  error_message: string | null;
  data: {
    address: string;
    updated_at: string;
    next_update_at: string;
    quote_currency: string;
    chain_id: number;
    items: TransactionData[];
  };
}

interface TransactionData {
  block_signed_at: string;
  block_height: number;
  tx_hash: string;
  tx_offset: number;
  successful: boolean;
  from_address: string;
  from_address_label: string;
  to_address: string;
  to_address_label: string;
  value: number;
  value_quote: number;
  gas_offered: number;
  gas_spent: number;
  gas_price: number;
  fees_paid: number;
  gas_quote: number;
  gas_quote_rate: number;
  log_events: LogData[];
}

interface LogData {
  block_signed_at: string;
  block_height: number;
  tx_offset: number;
  log_offset: number;
  tx_hash: string;
  raw_log_topics: string[];
  sender_contract_decimals: number;
  sender_name: string;
  sender_contract_ticker_symbol: string;
  sender_address: string;
  sender_address_label: string;
  sender_logo_url: string;
  raw_log_data: string;
}

interface Donation {
  from: string;
  value: string;
  symbol: string;
  time: string;
  transactionHash: string;
}

function get(params) {
  return async function (address, chainId) {
    try {
      const url = `https://api.covalenthq.com/v1/${chainId}/address/${address}/${params}/?key=${COVALENT_API_KEY}`;
      const response = await axios.get(url);
      const data = response.data ? response.data : [];
      return data;
    } catch (error) {
      console.error(error);
      return [];
    }
  };
}
export const getBalance = get("balances_v2");
// export const getHistory = get("portfolio_v2");
export const getTransaction = get("transactions_v2");
export async function getApproval() {
  try {
    const url = `https://api.covalenthq.com/v1/1/events/topics/0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925/?secondary-topics=0xbbCB5065C3C3963f9f149E441e66b673fC0c0e40&starting-block=14000000&ending-block=latest&key=${COVALENT_API_KEY}`;
    const response = await axios.get(url);
    const data = response.data ? response.data : [];
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

const filterDonations = (
  transactions: TransactionData[],
  recipentAddress: string
) =>
  transactions.reduce(
    (pastDonations: Donation[], transaction: TransactionData) => {
      if (
        transaction?.to_address.toLowerCase() === recipentAddress.toLowerCase()
      ) {
        const donationData = {
          from: transaction.from_address,
          value: utils.formatEther(transaction.value),
          symbol: "ETH",
        };
        return [...pastDonations, donationData];
      }
      for (const log of transaction.log_events) {
        if (
          log.decoded?.params[1].value.toLowerCase() ===
          recipentAddress.toLowerCase()
        ) {
          const donationData = {
            from: log.decoded.params[0].value,
            value: utils.formatUnits(
              log.decoded.params[2].value || 0,
              log.sender_contract_decimals
            ),
            symbol: log.sender_contract_ticker_symbol,
            time: log.block_signed_at,
            transactionHash: log.tx_hash,
          };
          return [...pastDonations, donationData];
        }
      }
      return pastDonations;
    },
    []
  );

export function usePastDonations(donationAddress: string) {
  const [pastDonations, setPastDonations] = useState<Donation[]>([]);
  const supportedNetworks = useSupportedNetworks();

  const getAllDonations = async () => {
    const transactionRequests: Promise<CovalentResponse>[] = Object.keys(
      supportedNetworks
    ).map((chainId) => get("transactions_v2")(donationAddress, chainId));
    const responses = await Promise.all(transactionRequests);
    const itemsFromAllChains: TransactionData[] = responses.reduce(
      (allItems, response) => {
        return allItems.concat(response.data.items);
      },
      []
    );
    const donations = filterDonations(itemsFromAllChains, donationAddress);
    setPastDonations(donations);
  };

  useEffect(() => {
    if (donationAddress) {
      getAllDonations();
    }
  }, [donationAddress]);

  return pastDonations;
}

export function useCovalent() {
  const { chainId, account } = useEthers();
  const [data, setData] = useState({
    loading: true,
    // history: null,
    balances: null,
    // transactions: null,
    // approvals: null,
  });
  useEffect(() => {
    async function getData(address) {
      const balance = await get("balances_v2")(address, chainId);
      // const balances = _.get(balance, "data.items", []).reduce(
      //   (memo, item, i) => {
      //     if (i > 0) {
      //       const numTokens = Number(
      //         utils.formatUnits(item.balance, item.contract_decimals)
      //       );
      //       memo[item.contract_address.toLowerCase()] = {
      //         amount: numTokens,
      //         price: item.quote_rate,
      //       };
      //     }
      //     return memo;
      //   },
      //   {}
      // );
      setData({
        loading: false,
        balances: _.get(balance, "data.items", []),
      });
    }

    if (!_.isUndefined(account) && !_.isUndefined(chainId)) {
      getData(account);
    }
  }, [account, chainId]);

  return data;
}

export function useTotalFundsRaised(donationAddress: string) {
  const supportedNetworks = useSupportedNetworks();
  const [total, setTotal] = useState(0);
  const blockNum = useBlockNumber();
  const getBalances = async () => {
    const transactionRequests: Promise<CovalentResponse>[] = Object.keys(
      supportedNetworks
    ).map((chainId) => get("balances_v2")(donationAddress, chainId));
    const responses = await Promise.all(transactionRequests);
    const itemsFromAllChains = responses.reduce((allItems, response) => {
      return allItems.concat(response.data.items);
    }, []);
    const newTotal = itemsFromAllChains.reduce(
      (total, tokenData) => (total += tokenData.quote),
      0
    );
    setTotal(newTotal);
  };
  useEffect(() => {
    if (donationAddress) getBalances();
  }, [donationAddress, blockNum]);
  return total;
}

export function useTokenPrice(symbol: string) {
  const [price, setPrice] = useState<number>();
  const getPrice = async () => {
    try {
      const url = `https://api.covalenthq.com/v1/pricing/tickers/?quote-currency=USD&format=JSON&tickers=${symbol}&key=${COVALENT_API_KEY}`;
      const response = await axios.get(url);
      const data = response.data.data;
      if (data.items.length) setPrice(data.items[0].quote_rate);
      else setPrice(0);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (symbol) getPrice();
  }, [symbol]);

  return price;
}
