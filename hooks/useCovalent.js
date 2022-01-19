import { useState, useEffect } from "react";
import _ from "lodash";
import axios from "axios";
import {
  COVALENT_API_KEY,
  CovalentNetworkForID,
  NETWORK,
} from "../utils/constants";

const covalentApiKey = COVALENT_API_KEY;

let chainId = CovalentNetworkForID[NETWORK];
export async function getHistory(address) {
  try {
    const url = `https://api.covalenthq.com/v1/${chainId}/address/${address}/portfolio_v2/?key=${covalentApiKey}`;
    console.log(url);
    const response = await axios.get(url);
    console.log(response);
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
    history: null,
  });
  useEffect(() => {
    async function getData(address) {
      const history = await getHistory(address);

      setData({
        loading: false,
        history: history,
      });
    }

    if (!_.isUndefined(address)) {
      getData(address);
    }
  }, [address]);

  return data;
}
