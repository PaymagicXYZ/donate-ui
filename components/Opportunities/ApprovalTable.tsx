import { useState, useMemo, useEffect } from "react";
import _ from "lodash";
import { ethers } from "ethers";
import { Box, Center, Spinner } from "@chakra-ui/react";

import { ApprovalTableContent } from "./ApprovalTableContent";
import { WalletChecker } from "../../components/WalletChecker";
import ERC20Contract from "../../artifacts/contracts/TestERC20.sol/TestERC20.json";
import tokenData from "../CleanWallet/tokens.json";
import { DUSTSWEEPER_ADDRESS } from "../../utils/constants";

export default function TransactionTable(props) {
  const [loading, setLoading] = useState(true);
  const [approvalList, setApprovalList] = useState([]);

  useEffect(() => {
    (async () => {
      const provider = ethers.getDefaultProvider(
        "https://mainnet.infura.io/v3/f3c58d461e4e4bc7860f2a562ca71f10"
      );
      const tokenAddressesMap = {};
      const tokenList = tokenData.tokens;
      tokenList.forEach((token) => {
        tokenAddressesMap[token.address] = [token.symbol, token.logoURI];
      });
      const tokenAddresses = [];
      tokenData.tokens.forEach((tokens) => {
        tokenAddresses.push(tokens.address);
      });
      let eventArray = [];
      try {
        for (let i = 0; i < tokenAddresses.length; i++) {
          const contract = new ethers.Contract(
            tokenAddresses[i],
            ERC20Contract.abi,
            provider
          );
          const filter = contract?.filters.Approval(
            null,
            "0xbbCB5065C3C3963f9f149E441e66b673fC0c0e40"
          );
          const events = await contract.queryFilter(filter, 14309300, "latest");
          eventArray.push(events);
        }
        const flatArray = eventArray.flat();
        //filter out approvals for 0 amount
        const filteredArray = flatArray.filter(function (el) {
          return Number(el.args[2].toString()) > 0;
        });
        //shortened to last 200 approve events
        // const sortArray = filteredArray
        //   .sort(function (a, b) {
        //     if (a.blockNumber === b.blockNumber) {
        //       return b.transactionIndex - a.transactionIndex;
        //     }
        //     return a.blockNumber < b.blockNumber ? 1 : -1;
        //   })
        //   .slice(0, 200);
        setApprovalList(
          filteredArray.map((el) => {
            return {
              balance: ethers.utils.formatEther(el.args[2].toString()),
              symbol: tokenAddressesMap[el.address.toLowerCase()],
              maker: el.args[0],
            };
          })
        );
        setLoading(false);
      } catch (err) {
        setApprovalList(null);
      }
    })();
  }, []);

  return (
    <Center>
      {loading ? (
        <Spinner size="xl" />
      ) : (
        <Box py={{ base: "2", md: "4" }}>
          <ApprovalTableContent approvalList={approvalList} />
        </Box>
      )}
    </Center>
  );
}
