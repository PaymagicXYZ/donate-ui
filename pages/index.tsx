import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useEthers } from "@usedapp/core";
import { SiweMessage } from "siwe";
import DonationForm from "../components/DonationForm";
import Layout from "../components/Layout";
import Header from "../components/Header";
import axios from "axios";
import Link from "next/link";
import {
  Text,
  Button,
  List,
  ListItem,
  Spinner,
  Tag,
  Spacer,
  HStack,
  VStack,
  Box,
  Container,
  Flex,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { supabaseClient as supabase } from "../supabaseClient";
import Account from "../components/Account";
import CauseList from "../components/CauseList";

export default function HomePage() {
  const [causeList, setCauseList] = useState<{ url: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const router = useRouter();
  const { account, chainId, library } = useEthers();

  useEffect(() => {
    const fetchAllCauses = async () => {
      setLoading(true);
      const { data, error } = await supabase.from("cause").select("url");
      setCauseList(data);
      setLoading(false);
    };
    fetchAllCauses();
  }, []);

  const handleSignIn = async () => {
    if (account) {
      const { data: nonce } = await axios.get("/api/auth/nonce");
      const messageData = new SiweMessage({
        domain: window.location.host,
        uri: window.location.origin,
        address: account,
        statement: "Sign in with Ethereum to EthGives",
        version: "1",
        chainId,
        nonce,
      });
      const message = messageData.prepareMessage();
      const signer = library.getSigner();
      const signature = await signer.signMessage(message);
      const { data } = await axios.post("/api/auth/verify", {
        message: message,
        signature,
      });
      await supabase.auth.setAuth(data.token);
      const { data: user, error } = await supabase.from("user").select("*");
    }
  };

  const goToCreatePage = () => {
    router.push("/create_cause");
  };

  const goToMyCausesPage = () => {
    router.push("/my_causes");
  };

  return (
    <VStack>
      <Header />
      <Box py="50px"></Box>
      <Box px="140px" w="full">
        <CauseList />
      </Box>
    </VStack>
  );
}
