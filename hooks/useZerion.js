import { useState, useEffect } from "react";
import _ from "lodash";
import axios from "axios";

const zerionApiKey = ZERION_API_KEY;
let network = NETWORK === "mainnet" ? "ethereum" : NETWORK;

export async function getAssets(address) {
  try {
    const url = `https://api.zapper.fi/v1/protocols/tokens/balances?addresses[]=${address}&network=${network}&api_key=${zapperApiKey}`;
    const response = await axios.get(url);
    // console.log(response)
    const data = response.data[_.toLower(address)]
      ? response.data[_.toLower(address)]
      : [];
    const holdings = _.get(data, ["products", "0", "assets"], []);
    const orderedHoldings = _.isEmpty(holdings)
      ? []
      : _.orderBy(holdings, ["balanceUSD"], ["desc"]);

    return orderedHoldings;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getNetworks(address) {
  try {
    const url = `https://api.zapper.fi/v1/protocols/balances/supported?addresses[]=${address}&network=${network}&api_key=${zapperApiKey}`;
    const response = await axios.get(url);
    // console.log(response)
    const data = response.data ? response.data : [];
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getEthProtocols(address) {
  try {
    const fullProtocols = await getNetworks(address);
    const ethProtocols = _.get(fullProtocols, ["0", "protocols"], []);
    const data = _.map(ethProtocols, "protocol");
    // console.log(data)
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getProtocolBalance(address, protocol) {
  try {
    const url = `https://api.zapper.fi/v1/protocols/${protocol}/balances?addresses[]=${address}&network=${network}&api_key=${zapperApiKey}`;
    const response = await axios.get(url);
    // console.log(response)
    const data = response.data ? response.data : {};
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getDeposits(address) {
  try {
    const ethProtocols = await getEthProtocols(address);

    const protocolData = {};
    for (let i = 0; i < ethProtocols.length; i++) {
      const temp = await getProtocolBalance(address, ethProtocols[i]);
      protocolData[ethProtocols[i]] = _.get(
        temp,
        [_.toLower(address), "products", "0"],
        {}
      );
    }
    // console.log(protocolData)

    console.log("Deposits");
    console.log(protocolData);

    return protocolData;
  } catch (error) {
    console.error(error);
    return {};
  }
}

export async function getTxs(address) {
  try {
    const url = `https://api.zapper.fi/v1/transactions/${address}?network=${network}&api_key=${zapperApiKey}`;
    const response = await axios.get(url);
    // console.log(response)
    const responseData = response.data ? response.data : [];
    const tenTx = responseData.slice(0, 10);
    return tenTx;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export function useZapper(address, _network) {
  network = _network ? _network : network;
  const [data, setData] = useState({
    loading: true,
    assets: null,
    deposits: null,
    txs: null,
  });
  useEffect(() => {
    async function getData(address) {
      const assets = await getAssets(address);
      // const deposits = await getDeposits(address)
      const deposits = [];
      const txs = await getTxs(address);

      setData({
        loading: false,
        assets: assets,
        deposits: deposits,
        txs: txs,
      });
    }

    if (!_.isUndefined(address)) {
      getData(address);
    }
  }, [address]);

  return data;
}
