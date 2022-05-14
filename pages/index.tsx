import { useEffect, useState } from "react";
import Router, { useRouter } from "next/router";
import { useEthers } from "@usedapp/core";
import { SiweMessage } from "siwe";
import Layout from "../components/Layout";
import axios, { AxiosError } from "axios";
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

export default function HomePage() {
  const [causeList, setCauseList] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const router = useRouter();
  const { account, chainId, library } = useEthers();

  useEffect(() => {
    const fetchAllCauses = async () => {
      setLoading(true);
      try {
        const { data: allCauses } = await axios.get("/api/causes");
        setCauseList(allCauses);
      } catch (e) {
        toast({
          title: "Couldn't fetch causes",
          description: e.message,
          status: "error",
          position: "bottom-left",
        });
      }
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
        chainId: chainId,
        nonce,
      });
      const message = messageData.prepareMessage();
      const signer = library.getSigner();
      const signature = await signer.signMessage(message);
      const { data } = await axios.post("/api/auth/verify", {
        message: message,
        signature,
      });
    }
  };

  const goToCreatePage = () => {
    router.push("/create_cause");
  };
  return (
    <Layout>
      <HStack>
        <Text fontSize="2xl">All Causes</Text>
        <Spacer />
        <Button onClick={goToCreatePage}>Create Cause</Button>
      </HStack>
      {loading && <Spinner />}
      <List>
        {causeList.map((cause) => (
          <ListItem key={cause} my="20px">
            <Tag>
              <Link href={`/${cause}`}>{cause}</Link>
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
