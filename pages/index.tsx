import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useEthers } from "@usedapp/core";
import { SiweMessage } from "siwe";
import Layout from "../components/Layout";
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
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { supabaseClient as supabase } from "./supabaseClient";

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
      console.log(data);
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
      console.log(user);
    }
  };

  const goToCreatePage = () => {
    router.push("/create_cause");
  };

  const goToMyCausesPage = () => {
    router.push("/my_causes");
  };

  return (
    <Layout>
      <HStack>
        <Text fontSize="2xl">All Causes</Text>
        <Spacer />
        <Button onClick={goToMyCausesPage}>View my Causes</Button>
        <Button onClick={goToCreatePage}>Create Cause</Button>
      </HStack>
      {loading && <Spinner />}
      <List>
        {causeList.map(({ url }) => (
          <ListItem key={url} my="20px">
            <Tag>
              <Link href={`/${url}`}>{url}</Link>
            </Tag>
          </ListItem>
        ))}
      </List>
      {/* <Button onClick={handleSignIn}>
        Sign In With Ethereum to Create Cause
      </Button> */}
    </Layout>
  );
}
