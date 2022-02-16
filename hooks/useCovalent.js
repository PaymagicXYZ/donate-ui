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
  return async function (address, chainId=1) {
    try {
      const url = `https://api.covalenthq.com/v1/${chainId}/address/${address}/${params}/?key=${covalentApiKey}`;
      console.log(url);
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
export const getHistory = get("portfolio_v2");
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
    history: null,
    balance: null,
  });
  useEffect(() => {
    async function getData(address, chainId) {
      const history = await getHistory(address);
      const balance = await getBalance(address);

      setData({
        loading: false,
        history: history,
        balance: balance,
      });
    }

    if (!_.isUndefined(address) && !_.isUndefined(chainId)) {
      getData(address, chainId);
    }
  }, [address, _chainId]);

  return data;
}
