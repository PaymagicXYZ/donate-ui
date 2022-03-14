import * as React from "react";
import _ from "lodash";
import { Box, Center, Spinner, Text } from "@chakra-ui/react";
import Wallet from "./Header/Wallet";

export const WalletChecker = (props) => {
  const { loading, account, contractAddress, children } = props;

  if (contractAddress === "0x") {
    return (
      <Center p="10">
        <Text as="i">🚫 Not available on this network</Text>
      </Center>
    );
  }

  if (_.isUndefined(account)) {
    return (
      <Center p="10">
        <Text as="i">
          Please connect your wallet to continue <Wallet />
        </Text>
      </Center>
    );
  }

  if (loading) {
    return (
      <Center>
        <Spinner size="xl" />
      </Center>
    );
  }

  return <>{children}</>;
};
