import Head from "next/head";
import Link from "next/link";
import { useWeb3React } from "@web3-react/core";
import { Progress } from "@chakra-ui/progress";
import {
  Alert,
  AlertIcon,
  Box,
  Container,
  Button,
  Divider,
  Flex,
  Text,
  Image,
  Heading,
  Stack,
  Spacer,
} from "@chakra-ui/react";
import { useRef } from "react";
import { useDisclosure } from "@chakra-ui/hooks";
import PageContainer from "../../components/PageContainer/PageContainer";

export default function Home() {
  const { chainId } = useWeb3React();
  const focusObj = useRef();
  const {
    isOpen: isBarOpen,
    onOpen: onBarOpen,
    onClose: onBarClose,
  } = useDisclosure();

  return (
    <PageContainer>
      <Flex justifyContent="center" flexWrap="wrap">
        <Box
          // role={"group"}
          p={6}
          m="5"
          maxW={"430px"}
          minW={"530px"}
          w={"full"}
          bg={"white"}
          boxShadow={"2xl"}
          rounded={"lg"}
          pos={"relative"}
          zIndex={1}
        >
          <Text fontSize="6xl" align="center" fontWeight={500}>
            Airdrop
          </Text>{" "}
          <Divider my={5} />
          <Text fontSize={"2xl"}>Send to many recipients</Text>
          <Text color={"gray.500"}>
            Input any token address and then batch transfer tokens to many
            different recipients in a single tx.
          </Text>
          <Progress value={15} />
        </Box>
      </Flex>
    </PageContainer>
  );
}