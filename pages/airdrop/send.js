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
  useColorModeValue
} from "@chakra-ui/react";
import { useRef } from "react";
import { useDisclosure } from "@chakra-ui/hooks";
import PageContainer from "../../components/PageContainer/PageContainer";
import { AirdropForm } from "../../components/FormWithShadow/AirdropForm";

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
      <Box bg={useColorModeValue('purple.50', 'purple.800')} py="10">
        <Box maxW="xl" mx="auto">
          <Stack spacing="12">
            <AirdropForm />
          </Stack>
        </Box>
      </Box>
    </PageContainer>
  );
}