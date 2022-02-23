import { hexlify } from "@ethersproject/bytes";
import { parseUnits } from "@ethersproject/units";
import { notification } from "antd";
import { BLOCKNATIVE_ID } from "./constants";

import Notify from "bnc-notify";

// this should probably just be renamed to "notifier"
// it is basically just a wrapper around BlockNative's wonderful Notify.js
// https://docs.blocknative.com/notify

export default function Transactor(provider, cb, gasPrice, etherscan) {
  if (typeof provider !== "undefined") {
    // eslint-disable-next-line consistent-return
    return async tx => {
      const signer = provider.getSigner();
      const network = await provider.getNetwork();
      const options = {
        dappId: BLOCKNATIVE_ID,
        system: "ethereum",
        networkId: network.chainId,
        desktopPosition: "topRight",
        // darkMode: Boolean, // (default: false)
        transactionHandler: txInformation => {
          console.log("HANDLE TX", txInformation);
        },
      };
      const notify = Notify(options);

      let etherscanNetwork = "";
      if (network.name && network.chainId > 1) {
        etherscanNetwork = network.name + ".";
      }

      let etherscanTxUrl = "https://" + etherscanNetwork + "etherscan.io/tx/";
      if (network.chainId === 100) {
        etherscanTxUrl = "https://blockscout.com/poa/xdai/tx/";
      }

      try {
        let result;
        if (tx instanceof Promise) {
          console.log("AWAITING TX", tx);
          result = await tx;
        } else {
          if (!tx.gasPrice) {
            tx.gasPrice = gasPrice || parseUnits("4.1", "gwei");
          }
          if (!tx.gasLimit) {
            tx.gasLimit = hexlify(120000);
          }
          console.log("RUNNING TX", tx);
          result = await signer.sendTransaction(tx);
        }
        console.log("RESULT:", result);
        console.log("Notify", notify);

        // if it is a valid Notify.js network, use that, if not, just send a default notification
        if ([1, 3, 4, 5, 42, 100, 137, 1337, 31337, 80001].indexOf(network.chainId) >= 0) {
          const { emitter } = notify.hash(result.hash);
          emitter.on("all", transaction => {
            return {
              onclick: () => window.open((etherscan || etherscanTxUrl) + transaction.hash),
            };
          });
          emitter.on('txConfirmed', transaction => {
            console.log('txConfirmed');
            cb('txConfirmed', transaction);
            return {
              onclick: () => window.open((etherscan || etherscanTxUrl) + transaction.hash),
            };
          });
          emitter.on('txCancel', transaction => {
            console.log('txCancel', transaction);
            cb('txCancel');
            return {
              onclick: () => window.open((etherscan || etherscanTxUrl) + transaction.hash),
            };
          });
          emitter.on('txFailed', transaction => {
            console.log('txFailed');
            cb('txFailed', transaction);
            return {
              onclick: () => window.open((etherscan || etherscanTxUrl) + transaction.hash),
            };
          });
        } else {
          notification.info({
            message: "Local Transaction Sent",
            description: result.hash,
            placement: "topRight",
          });
        }

        return result;
      } catch (e) {
        cb(e);
        notification.error({
          message: "Transaction Error",
          description: e.message,
          desktopPosition: "topRight"
        });
      }
    };
  }
}