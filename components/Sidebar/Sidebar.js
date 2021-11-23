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

import { RiHandCoinLine, RiSendPlaneFill } from "react-icons/ri";
import { AiOutlinePicture } from "react-icons/ai";
import { GiParachute } from "react-icons/gi";
import { GrHistory } from "react-icons/gr";

import { MdAccountBalance } from "react-icons/md";
import { NavItem } from "./NavItem";
import { useRouter } from "next/router";
import { Logo } from '../Header/Logo'

export default function Sidebar(props) {
  const router = useRouter();
  return (
    <>

      <Box w="64" bg="gray.900" color="white" fontSize="md" borderTopRightRadius="md">
        <Flex h="full" direction="column" px="4" py="4">
          <Stack spacing="2" flex="1" overflow="auto" pt="8">

{/*            <Link href="/">
              <a>
                <Center marginEnd="10">
                  <Logo h="6" iconColor={mode('blue.600', 'blue.300')} />
                </Center>
              </a>
            </Link>*/}




            <Link href="/payments/disperse">
              <a>
                <NavItem icon={<RiSendPlaneFill />} label="Batch token transfer" />
              </a>
            </Link>
            <Link href="/payments/disperseNFT">
              <a>
                <NavItem icon={<AiOutlinePicture />} label="Batch NFTs transfer" />
              </a>
            </Link>
            <Link href="/transactions">
              <a>
                <NavItem icon={<BsClockHistory />} label="Transactions" />
              </a>
            </Link>
{/*            <Link href="/airdrop/send">
              <a>
                <NavItem icon={<GiParachute />} label="Send Airdrop" />
              </a>
            </Link>
            <Link href="/airdrop/claim">
              <a>
                <NavItem icon={<RiHandCoinLine />} label="Claim Airdrop" />
              </a>
            </Link>*/}
          </Stack>
        </Flex>
      </Box>
    </>
  );
}
