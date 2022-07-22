import { HStack, Text, Button as ChakraButton, Avatar } from "@chakra-ui/react";
import { shortenAddress } from "../../utils";
import ConnectWallet from "../ConnectWallet";
import { useEthers, useLookupAddress } from "@usedapp/core";
import Account from "../Account";
import CauseLink from "../CauseLink";
import DevModeSwitch from "../DevModeSwitch";
import Button from "../Button";
import { useRouter } from "next/router";
import Link from "next/link";
import { Box } from "@chakra-ui/react";

const Header = () => {
  const { pathname } = useRouter();
  const isHome = pathname === "/";
  const { account, deactivate } = useEthers();
  const ENSname = useLookupAddress();
  return (
    <HStack w="full" px="140px" py="60px" position="fixed">
      <CauseLink />
      {!isHome && process.env.NEXT_PUBLIC_DEBUG && <DevModeSwitch />}
      {isHome && (
        <Link href="/create" passHref>
          <Button w="250px" borderRadius="accountBtn">
            <Text fontWeight={700}>+ Create a link</Text>
          </Button>
        </Link>
      )}
      {!!account ? (
        <ChakraButton
          onClick={deactivate}
          px="24px"
          py="10px"
          color="white"
          fontSize="18px"
          lineHeight="28px"
          h="48px"
          borderRadius="full"
          w="250px"
          bg="rgba(0, 0, 0, 0.4)"
          _hover={{ bg: "rgba(0, 0, 0, 0.6)" }}
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
        </ChakraButton>
      ) : (
        <ConnectWallet
          px="24px"
          py="10px"
          color="white"
          fontSize="18px"
          lineHeight="28px"
          h="48px"
          borderRadius="full"
          w="250px"
          bg="rgba(0, 0, 0, 0.4)"
          _hover={{ bg: "rgba(0, 0, 0, 0.6)" }}
        />
      )}
    </HStack>
  );
};

export default Header;
