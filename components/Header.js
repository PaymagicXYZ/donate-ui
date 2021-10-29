import Link from "next/link";
import {
  Button,
  Divider,
  Flex,
  Heading,
  Spacer,
  Image,
  Stack,
} from "@chakra-ui/react";
import { CopyIcon } from "@chakra-ui/icons";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";

import { useEagerConnect } from "../hooks/useEagerConnect";
import { useInactiveListener } from "../hooks/useInactiveListener";
import { injected } from "../connectors";
import { translateChainId } from "../utils";

function Header() {
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
    <header>
      <Flex
        p={6}
        flexWrap="wrap"
        // bgGradient="linear(to-l, #12c2e9, #c471ed,  #fbcdcf)"
      >
        <Link href="/">
          <a>
            <Stack direction="row" alignItems="center">
              <Image
                src="logo_512x512.png"
                alt="Balloon"
                boxSize="48px"
                objectFit="cover"
              />
              <Heading as="h1" size="lg" isTruncated>
                Paymagic
              </Heading>
            </Stack>
          </a>
        </Link>
        <Spacer />
        <Account />
        <Network />
      </Flex>
      {/* <Divider mb={5} /> */}
    </header>
  );
}

export default Header;
