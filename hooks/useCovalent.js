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
    const url = `https://api.covalenthq.com/v1/1/events/topics/0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925/?secondary-topics=0xbbCB5065C3C3963f9f149E441e66b673fC0c0e40&starting-block=14000000&ending-block=latest&key=${covalentApiKey}`;
    const response = await axios.get(url);
    const data = response.data ? response.data : [];
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export function useCovalent(address, _chainId) {
  chainId = _chainId ? _chainId : chainId;
  const [data, setData] = useState({
    loading: true,
    // history: null,
    balance: null,
    transactions: null,
    // approvals: null,
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
        // approvals: await getApproval(),
      });
    }

    if (!_.isUndefined(address) && !_.isUndefined(chainId)) {
      getData(address, chainId);
    }
  }, [address, _chainId]);

  return data;
}
