import { useState, useEffect } from "react";
import _ from "lodash";
import { ZERION_API_KEY } from "../utils/constants";
import { client } from "defi-sdk";

const zerionApiKey = ZERION_API_KEY;
const endpoint = "wss://api-v4.zerion.io";
client.configure({ url: endpoint, apiToken: zerionApiKey });

export async function getChart(address) {
  try {
    client.subscribe({
      namespace: "assets",
      body: { scope: ["charts"], payload: { "body parameter": "value" } },
      onMessage: (event: Event, data: Response) => {
        console.log(Response);
      },
    });
  } catch (error) {
    console.error(error);
    return [];
  }
}

export function useZerion(address, _network) {
  const [data, setData] = useState({
    loading: true,
    chart: null,
  });
  useEffect(() => {
    async function getData(address) {
      const chart = await getChart(address);

      setData({
        loading: false,
        chart: chart,
      });
    }

    if (!_.isUndefined(address)) {
      getData(address);
    }
  }, [address]);

  return data;
}
