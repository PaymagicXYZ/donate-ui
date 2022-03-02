import { useState, useEffect } from "react";
import _ from "lodash";
import axios from "axios";
import {
  COVALENT_API_KEY,
  CovalentNetworkForID,
  NETWORK,
} from "../utils/constants";

const covalentApiKey = COVALENT_API_KEY;

let chainId = 1;
// let chainId = CovalentNetworkForID[NETWORK];

function get(params, chainId) {
  return async function (address, chainId = 1) {
    try {
      const url = `https://api.covalenthq.com/v1/${chainId}/address/${address}/${params}/?key=${covalentApiKey}`;
      // console.log(url);
      const response = await axios.get(url);
      const data = response.data ? response.data : [];
      return data;
    } catch (error) {
      console.error(error);
      return [];
    }
  };
}
//api.covalenthq.com/v1/1/address/0x197e3eCCD00F07B18205753C638c3E59013A92bf/transfers_v2/?contract-address=0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48&key=
export const getBalance = get("balances_v2");
// export const getHistory = get("portfolio_v2");
//https://api.covalenthq.com/v1/1/address/0xCFF4C7EAF2d708Da1b68C767340446E4193F2706/transactions_v2/?quote-currency=USD&format=JSON&block-signed-at-asc=false&no-logs=false&key=
export const getTransaction = get("transactions_v2");
// export async function getHistory(address) {
//   try {
//     const url = `https://api.covalenthq.com/v1/${chainId}/address/${address}/portfolio_v2/?key=${covalentApiKey}`;
//     console.log(url);
//     const response = await axios.get(url);
//     console.log(response);
//     const data = response.data ? response.data : [];
//     return data;
//   } catch (error) {
//     console.error(error);
//     return [];
//   }
// }

export function useCovalent(address, _chainId) {
  chainId = _chainId ? _chainId : chainId;
  const [data, setData] = useState({
    loading: true,
    // history: null,
    balance: null,
    transactions: null,
  });
  useEffect(() => {
    async function getData(address, chainId) {
      // const history = await getHistory(address);
      const balance = await getBalance(address);
      const transactions = await getTransaction(address);
      setData({
        loading: false,
        // history: history,
        balance: balance,
        transactions: transactions,
      });
    }

    if (!_.isUndefined(address) && !_.isUndefined(chainId)) {
      getData(address, chainId);
    }
  }, [address, _chainId]);

  return data;
}
