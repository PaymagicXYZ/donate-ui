import { useState, useEffect } from "react";
import { useEthers } from "@usedapp/core";
import { utils } from "ethers";
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

function get(params) {
  return async function (address, chainId) {
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

export function useCovalent() {
  const { chainId, account } = useEthers();
  const [data, setData] = useState({
    loading: true,
    // history: null,
    balances: null,
    transactions: null,
    // approvals: null,
  });
  useEffect(() => {
    async function getData(address) {
      const transactions = await get("balances_v2")(address, chainId);
      const balance = await get("balances_v2")(address, chainId);
      const balances = _.get(balance, "data.items", []).reduce(
        (memo, item, i) => {
          if (i > 0) {
            const numTokens = Number(
              utils.formatUnits(item.balance, item.contract_decimals)
            );
            memo[item.contract_address.toLowerCase()] = numTokens;
          }
          return memo;
        },
        {}
      );
      setData({
        loading: false,
        balances,
        transactions,
      });
    }

    if (!_.isUndefined(account) && !_.isUndefined(chainId)) {
      getData(account, chainId);
    }
  }, [account, chainId]);

  return data;
}
