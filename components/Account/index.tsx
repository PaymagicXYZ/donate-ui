import {
  Avatar,
  Button,
  HStack,
} from "@chakra-ui/react";
import { useEthers, useLookupAddress, ChainId, useEtherBalance, Mainnet } from '@usedapp/core';
import { SmallCloseIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { useInactiveListener } from "../../hooks/useInactiveListener";
import ConnectWallet from '../ConnectWallet';
import { useEffect, useState } from "react";
import { formatEther } from "@ethersproject/units";
import { shortenAddress } from "../../utils";
import { getNativeToken } from "../../utils";
import { ethers } from "ethers";

export default (props) => {
  const { account, deactivate } = useEthers();
  const ENSname = useLookupAddress();
  const balance = useEtherBalance(account, {chainId: Mainnet.chainId});

  const Account = () => {
    if (!account) {
      return (
        <ConnectWallet/>
      );
    }
    return (
      <HStack spacing={-4}>
        {balance ? (
          <Button
            isDisabled
            size="md"
            borderRadius="xl"
            pr="5"
            backgroundColor="purple.100"
            _hover={{
              bg: "purple.100",
            }}
            _active={{
              bg: "purple.100",
            }}
            _disabled={{
              bg: "purple.100",
              cursor: "default",
            }}
          >
            {Number(formatEther(balance)).toFixed(5)}{" "}
            ETH
          </Button>
        ) : null}

        <Button
          colorScheme="purple"
          size="md"
          borderRadius="xl"
          margin-left="-20px"
          pr="5"
          color="black"
          backgroundColor="purple.100"
          _hover={{
            bg: "purple.100",
          }}
          _active={{
            bg: "purple.100",
          }}
          onClick={deactivate}
        >
          {ENSname ? (
            <>
              <Avatar
                size="sm"
                name={ENSname}
                src={`https://metadata.ens.domains/mainnet/avatar/${ENSname}`}
              />
              &nbsp;{ENSname}
            </>
          ) : (
            shortenAddress(account)
          )}
          <SmallCloseIcon ml={1} color="blue.400" marginRight="-13px" />
        </Button>
      </HStack>
    );
  };

  return (
    <HStack spacing={4} width="full">
      <Account />
    </HStack>
  );
}
