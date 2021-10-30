import Head from "next/head";
import Link from "next/link";
import {
  Box,
  Flex,
  Stack,
  Circle,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import { BiBuoy, BiCog } from "react-icons/bi";

import { FaHandshake } from "react-icons/fa";

import { BsClockHistory } from "react-icons/bs";

import { IoWalletSharp } from "react-icons/io5";

import { IoMdContacts } from "react-icons/io";

import { RiHandCoinLine, RiSendPlaneFill } from "react-icons/ri";

import { MdAccountBalance } from "react-icons/md";
import { NavItem } from "./NavItem";
import { useRouter } from "next/router";

export default function Sidebar(props) {
  const router = useRouter();
  return (
    <>
      <Box height="140vh" overflow="hidden" position="relative">
        <Flex h="full" id="app-container">
          <Box w="64" bg="gray.900" color="white" fontSize="sm" rounded="md">
            <Flex h="full" direction="column" px="4" py="4">
              <Stack spacing="2" flex="1" overflow="auto" pt="8">
                <Link href="/payments">
                  <a>
                    <NavItem icon={<RiSendPlaneFill />} label="Send Payment" />
                  </a>
                </Link>
                <Link href="/airdrop">
                  <a>
                    <NavItem icon={<RiHandCoinLine />} label="Claim Airdrop" />
                  </a>
                </Link>
                <NavItem icon={<BsClockHistory />} label="Past Transactions" />
                <NavItem icon={<MdAccountBalance />} label="Balances" />
                <NavItem icon={<IoWalletSharp />} label="Wallets" />
                <NavItem icon={<IoMdContacts />} label="Contracts" />

                <NavItem icon={<FaHandshake />} label="DAO Deals" />
              </Stack>
              <Box>
                <Stack spacing="1">
                  <NavItem subtle icon={<BiCog />} label="Settings" />
                  <NavItem
                    subtle
                    icon={<BiBuoy />}
                    label="Help & Support"
                    endElement={<Circle size="2" bg="blue.400" />}
                  />
                </Stack>
              </Box>
            </Flex>
          </Box>
          <Box bg={mode("white", "gray.800")} flex="1" p="6">
            {props.children}
          </Box>
        </Flex>
      </Box>
    </>
  );
}
