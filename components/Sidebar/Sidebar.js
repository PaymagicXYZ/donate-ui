import Head from "next/head";
import Link from "next/link";
import {
  Box,
  Flex,
  Stack,
  Circle,
  Center,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import { BiBuoy, BiCog } from "react-icons/bi";

import { BsClockHistory } from "react-icons/bs";

import { IoWalletSharp } from "react-icons/io5";

import { IoMdContacts } from "react-icons/io";

import { FiSend, FiPieChart } from "react-icons/fi";
import { FaList } from "react-icons/fa";
import { RiHandCoinLine } from "react-icons/ri";
import { AiOutlinePicture } from "react-icons/ai";
import { GiParachute } from "react-icons/gi";
import { GrHistory, GrAnalytics } from "react-icons/gr";
import {
  MdPayment,
  MdPayments,
  MdAccountTree,
  MdAccountBalance,
  MdReceipt,
} from "react-icons/md";

import { NavItem } from "./NavItem";
import { NavGroup } from "./NavGroup";
import { useRouter } from "next/router";
import { Logo } from "../Header/Logo";

export default function Sidebar(props) {
  const router = useRouter();
  return (
    <>
      <Box
        h="100%"
        w="64"
        bg="gray.900"
        color="white"
        fontSize="md"
        borderTopRightRadius="md"
      >
        <Flex h="full" direction="column" px="4" py="4">
          <Stack spacing="6" flex="1" overflow="auto" pt="8">

            <NavGroup label="Connected Wallet">

              <Link href="/dashboard">
                <a>

                  <NavItem active={router.pathname === '/dashboard'} icon={<FiPieChart />} label="Dashboard" />
                </a>
              </Link>
              <Link href="/payments">
                <a>

                  <NavItem active={router.pathname === '/payments'} icon={<MdPayments />} label="Send Payment" />
                </a>
              </Link>
              <Link href="/transactions">
                <a>
                  <NavItem
                    active={router.pathname === "/transactions"}
                    icon={<MdReceipt />}
                    label="Transactions"
                  />
                </a>
              </Link>
            </NavGroup>

            <NavGroup label="Smart Accounts">

              <Link href="/accounts">
                <a>
                  <NavItem
                    active={router.pathname === "/accounts"}
                    icon={<FaList />}
                    label="All Accounts"
                  />
                </a>
              </Link>

              {/* Disabled */}

            </NavGroup>

            <NavGroup label="Airdrops (Coming Soon)">

              <a>
                <NavItem
                  isDisabled
                  active={router.pathname === "/airdrop/send"}
                  icon={<GiParachute />}
                  label="Send Token Airdrop"
                />
              </a>

              <a>
                <NavItem
                  isDisabled
                  active={router.pathname === "/airdrop/claim"}
                  icon={<RiHandCoinLine />}
                  label="Claim Airdrop"
                />
              </a>

            </NavGroup>

          </Stack>
        </Flex>
      </Box>
    </>
  );
}
