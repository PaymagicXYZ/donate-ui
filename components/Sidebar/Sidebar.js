import Head from "next/head";
import Link from "next/link";
import {
  Box,
  Flex,
  Stack,
  Circle,
  Center,
  useColorModeValue as mode
} from "@chakra-ui/react";
import { BiBuoy, BiCog } from "react-icons/bi";

import { BsClockHistory } from "react-icons/bs";

import { IoWalletSharp } from "react-icons/io5";

import { IoMdContacts } from "react-icons/io";

import { FiSend, FiPieChart } from "react-icons/fi";
import { RiHandCoinLine } from "react-icons/ri";
import { AiOutlinePicture } from "react-icons/ai";
import { GiParachute } from "react-icons/gi";
import { GrHistory, GrAnalytics } from "react-icons/gr";
import { MdPayment, MdPayments, MdAccountTree, MdAccountBalance, MdReceipt } from "react-icons/md";

import { NavItem } from "./NavItem";
import { NavGroup } from "./NavGroup";
import { useRouter } from "next/router";
import { Logo } from '../Header/Logo'

export default function Sidebar(props) {
  const router = useRouter();
  return (
    <>

      <Box h='100%' w="64" bg="gray.900" color="white" fontSize="md" borderTopRightRadius="md">
        <Flex h="full" direction="column" px="4" py="4">
          <Stack spacing="6" flex="1" overflow="auto" pt="8">

{/*            <Link href="/">
              <a>
                <Center marginEnd="10">
                  <Logo h="6" iconColor={mode('blue.600', 'blue.300')} />
                </Center>
              </a>
            </Link>*/}



            <NavGroup label="Payments">
              <Link href="/payments/disperse">
                <a>
                  <NavItem active={router.pathname === '/payments/disperse'} icon={<FiSend />} label="Batch transfer tokens" />
                </a>
              </Link>
              <Link href="/payments/disperseNFT">
                <a>
                  <NavItem active={router.pathname === '/payments/disperseNFT'} icon={<AiOutlinePicture />} label="Batch transfer NFTs" />
                </a>
              </Link>
            </NavGroup>

{            <NavGroup label="Airdrops">
              <Link href="/airdrop/send">
                <a>
                  <NavItem active={router.pathname === '/airdrop/send'} icon={<GiParachute />} label="Send Token Airdrop" />
                </a>
              </Link>
              <Link href="/airdrop/claim">
                <a>
                  <NavItem active={router.pathname === '/airdrop/claim'} icon={<RiHandCoinLine />} label="Claim Airdrop" />
                </a>
              </Link>
            </NavGroup>}

{/*            <NavGroup label="Other Payments">
              <Link href="/payments/vesting">
                <a>
                  <NavItem active={router.pathname === '/payments/vesting'} icon={<GiParachute />} label="Vesting Schedules" />
                </a>
              </Link>
              <Link href="/payments/streaming">
                <a>
                  <NavItem active={router.pathname === '/payments/streaming'} icon={<RiHandCoinLine />} label="Streaming Payments" />
                </a>
              </Link>
            </NavGroup>*/}


{/*            <NavGroup label="Smart Accounts">
              <Link href="/payments">
                <a>
                  <NavItem active={router.pathname === '/payments'} icon={<MdPayments />} label="Payments" />
                </a>
              </Link>
              <Link href="/transactions">
                <a>
                  <NavItem active={router.pathname === '/transactions'} icon={<MdReceipt />} label="Transactions" />
                </a>
              </Link>


                <a>
                  <NavItem isDisabled active={router.pathname === '/cards'} icon={<MdPayment />} label="Card" />
                </a>
                <a>
                  <NavItem isDisabled active={router.pathname === '/accounts'} icon={<MdAccountTree />} label="Accounts" />
                </a>
                <a>
                  <NavItem isDisabled active={router.pathname === '/holdings'} icon={<FiPieChart />} label="Holdings" />
                </a>
            </NavGroup>*/}





          </Stack>
        </Flex>
      </Box>
    </>
  );
}
