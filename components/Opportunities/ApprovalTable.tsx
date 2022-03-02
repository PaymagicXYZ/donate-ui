import { useState, useMemo, useEffect, useCallback } from "react";
import _ from "lodash";
import { ethers } from "ethers";
import { Box, Center } from "@chakra-ui/react";

import { ApprovalTableContent } from "./ApprovalTableContent";
import { WalletChecker } from "../../components/WalletChecker";
import { useCovalent } from "../../hooks/useCovalent";
import { useContract } from "../../hooks/useContract";
import useEventListener from "../../hooks/useEventListener";
import { useWeb3React } from "@web3-react/core";
import ERC20Contract from "../../artifacts/contracts/TestERC20.sol/TestERC20.json";
import tokenData from "../CleanWallet/tokens.json";
import { DUSTSWEEPER_ADDRESS } from "../../utils/constants";

export default function TransactionTable(props) {
  const tokenList = tokenData.tokens;
  const tokenAddressesMap = {};
  tokenList.forEach((token) => {
    tokenAddressesMap[token.address] = [token.symbol, token.logoURI];
  });
  function getAllTokens() {
    let addressArray = [];
    tokenData.tokens.forEach((tokens) => {
      addressArray.push(tokens.address);
    });
    return addressArray;
  }
  const tokenAddresses = getAllTokens();
  const { library, account, chainId } = useWeb3React();
  const [loading, setLoading] = useState(true);
  const [approvalList, setApprovalList] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        let eventArray = [];
        for (let i = 0; i < tokenAddresses.length; i++) {
          const contract = new ethers.Contract(
            tokenAddresses[i],
            ERC20Contract.abi,
            library
          );
          ///replace with actual DustSweeper address
          const filter = contract?.filters.Approval(null, null);
          const events = await contract.queryFilter(filter, -100, "latest");
          eventArray.push(events);
        }
        const flatArray = eventArray.flat();
        //filter out approvals for 0 amount
        const filteredArray = flatArray.filter(function (el) {
          return Number(el.args[2].toString()) > 0;
        });
        //shortened to last 200 approve events
        const sortArray = filteredArray
          .sort(function (a, b) {
            if (a.blockNumber === b.blockNumber) {
              return b.transactionIndex - a.transactionIndex;
            }
            return a.blockNumber < b.blockNumber ? 1 : -1;
          })
          .slice(0, 200);
        setApprovalList(
          sortArray.map((el) => {
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
  }, [tokenAddresses, library]);

  return (
    <WalletChecker loading={loading} account={account}>
      <Center>
        <Box py={{ base: "2", md: "4" }}>
          <ApprovalTableContent approvalList={approvalList} />
        </Box>
      </Center>
    </WalletChecker>
  );
}
