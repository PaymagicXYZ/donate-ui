import {
  Button,
  Spacer,
} from "@chakra-ui/react";
import { CopyIcon } from "@chakra-ui/icons";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";

import { useEagerConnect } from "../../hooks/useEagerConnect";
import { useInactiveListener } from "../../hooks/useInactiveListener";
import { injected } from "../../connectors";
import { translateChainId } from "../../utils";

export default function Wallet() {

  const context = useWeb3React();
  const { account, activate, chainId } = context;

  // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
  const triedEager = useEagerConnect();

  // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
  useInactiveListener(!triedEager);

  const Account = () => {
    if (account === null || account === undefined) {
      return (
        <Button
          colorScheme="red"
          variant="outline"
          onClick={() => activate(injected)}
        >
          Connect MetaMask
        </Button>
      );
    }

    return (
      <Button
        colorScheme="blue"
        variant="outline"
        onClick={() => navigator.clipboard.writeText(account)}
      >
        {`${account.substring(0, 6)}...${account.substring(
          account.length - 4
        )}`}
        <CopyIcon ml={1} color="blue.400" />
      </Button>
    );
  };

  const Network = () => {
    if (!chainId) {
      return null;
    }

    return (
      <Button colorScheme="orange" variant="outline" ml={2}>
        {translateChainId(chainId)}
      </Button>
    );
  };

  return (
    <>
      <Spacer />
      <Account />
      <Network />
    </>
  )
}