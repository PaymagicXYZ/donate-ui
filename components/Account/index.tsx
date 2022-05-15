import { Avatar, Button, HStack } from "@chakra-ui/react";
import { useEthers, useLookupAddress } from "@usedapp/core";
import { SmallCloseIcon } from "@chakra-ui/icons";
import ConnectWallet from "../ConnectWallet";
import { shortenAddress } from "../../utils";
import { useLocalCurrency } from "../../hooks";

export default function Account() {
  const { account, deactivate } = useEthers();
  const localCurrency = useLocalCurrency();
  const ENSname = useLookupAddress();

  const Account = () => {
    if (!account) {
      return <ConnectWallet />;
    }
    return (
      <HStack spacing={-4}>
        {localCurrency ? (
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
            {localCurrency.balance.toFixed(5)} {localCurrency.symbol}
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
