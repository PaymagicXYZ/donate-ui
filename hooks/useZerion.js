import { useState, useEffect } from "react";
import _ from "lodash";
import { ZERION_API_KEY } from "../utils/constants";
import io from "socket.io-client";

const zerionApiKey = ZERION_API_KEY;
const endpoint = "wss://api.zerion.io";

function verify(request, response) {
  // each value in request payload must be found in response meta
  return Object.keys(request.payload).every((key) => {
    const requestValue = request.payload[key];
    const responseMetaValue = response.meta[key];
    if (typeof requestValue === "object") {
      return JSON.stringify(requestValue) === JSON.stringify(responseMetaValue);
    }
    return responseMetaValue === requestValue;
  });
}

const addressSocket = {
  namespace: "address",
  socket: io(`${endpoint}/address`, {
    transports: ["websocket"],
    timeout: 60000,
    query: {
      api_token: zerionApiKey,
    },
  }),
};

function get(socketNamespace, requestBody) {
  return new Promise((resolve) => {
    const { socket, namespace } = socketNamespace;
    function handleReceive(data) {
      if (verify(requestBody, data)) {
        unsubscribe();
        resolve(data);
      }
    }
    const model = requestBody.scope[0];
    function unsubscribe() {
      socket.off(`received ${namespace} ${model}`, handleReceive);
      socket.emit("unsubscribe", requestBody);
    }
    socket.emit("get", requestBody);
    socket.on(`received ${namespace} ${model}`, handleReceive);
  });
}

export function useZerion(address) {
  const [data, setData] = useState({
    loading: true,
    portfolio: null,
  });
  useEffect(() => {
    async function getData(address) {
      get(addressSocket, {
        scope: ["portfolio"],
        payload: {
          address: address,
          currency: "usd",
          portfolio_fields: "all",
        },
      }).then((response) => {
        setData({ loading: false, portfolio: response });
        console.log(response);
      });
    }

    if (!_.isUndefined(address)) {
      getData(address);
    }
  }, [address]);

  return data;
}
