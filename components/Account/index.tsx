import { Avatar, Button, HStack } from "@chakra-ui/react";
import { useEthers, useLookupAddress } from "@usedapp/core";
import ConnectWallet from "../ConnectWallet";
import { shortenAddress } from "../../utils";

export default function Account(props) {
  const { account, deactivate } = useEthers();
  const ENSname = useLookupAddress();

  if (!account) {
    return <ConnectWallet />;
  }
  return (
    <Button
      colorScheme="purple"
      size="md"
      borderRadius="accountBtn"
      margin-left="-20px"
      pr="5"
      h="48px"
      color="white"
      backgroundColor="black"
      _hover={{
        bg: "black",
      }}
      _active={{
        bg: "black",
      }}
      onClick={deactivate}
      {...props}
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
    </Button>
  );
}
