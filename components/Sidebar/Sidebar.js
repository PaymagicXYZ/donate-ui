import React, { useState } from "react";
import {
  Flex,
  Text,
  IconButton,
  Divider,
  Avatar,
  Heading,
} from "@chakra-ui/react";
import {
  FiMenu,
  FiHome,
  FiCalendar,
  FiUser,
  FiDollarSign,
  FiBriefcase,
  FaHandshake,
  FiGithub,
} from "react-icons/fa";

import { BsClockHistory } from "react-icons/bs";

import { IoHelpBuoySharp, IoWalletSharp } from "react-icons/io5";

import { IoMdContacts } from "react-icons/io";

import { RiHandCoinLine, RiSendPlaneFill } from "react-icons/ri";

import { MdAccountBalance } from "react-icons/md";

import { FaQuestion } from "react-icons/fi";
import NavItem from "./NavItem";
import Link from "next/link";

export default function Sidebar() {
  const [navSize, changeNavSize] = useState("small");
  return (
    <Flex
      style={{ position: "fixed" }}
      position="absolute"
      left="5"
      h="95vh"
      boxShadow="10px 0px 5px 0 rgba(0, 0, 0, 0.05)"
      borderRadius={navSize == "small" ? "15px" : "30px"}
      w="200px"
      flexDir="column"
      justifyContent="space-between"
    >
      <Flex
        // marginTop="1vh"
        p="5%"
        flexDir="column"
        w="100%"
        alignItems="center"
        as="nav"
      >
        {" "}
        <Link href="/payments">
          <a>
            <NavItem icon={RiSendPlaneFill} title="Send Payment" />
          </a>
        </Link>
        <NavItem icon={RiHandCoinLine} title="Claim Airdrop" />
        <NavItem icon={BsClockHistory} title="Past Transactions" />
        <NavItem icon={MdAccountBalance} title="Balances" />
        <NavItem icon={IoWalletSharp} title="Wallets" />
        <NavItem icon={IoMdContacts} title="Contacts" />
        <NavItem icon={FaHandshake} title="DAO Deals" />
      </Flex>

      <Flex p="5%" flexDir="column" w="100%" alignItems="center" mb={4}></Flex>
    </Flex>
  );
}
