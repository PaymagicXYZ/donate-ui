import { useMemo, useState } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import {
  Button,
  Box,
  Container,
  Radio,
  RadioGroup,
  Flex,
  Heading,
  Input,
  Text,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Image,
  Stack,
  Circle,
  Alert,
  AlertIcon,
  useToast,
  Spacer,
  Divider,
  SimpleGrid,
  useColorModeValue as mode,
} from "@chakra-ui/react";

// import { AddressesContext } from "../../../contexts";
import { useWeb3React } from "@web3-react/core";

// import AddressList from "../../components/AddressList";
// import CampaignForm from "../../components/CampaignForm";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Sidebar from "../../components/Sidebar/Sidebar";
import ConnectionAlert from "../../components/ConnectionAlert";
import Link from "next/link";

// import { NavItem } from "../../components/NavItem";

function PaymentsPage() {
  const { library, account, chainId } = useWeb3React();
  const [addresses, setAddresses] = useState();
  const providerAddresses = useMemo(
    () => ({ addresses, setAddresses }),
    [addresses, setAddresses]
  );
  const paymentsTypes = [
    {
      title: "Disperse",
      image: "split-payment.png",
      imageAlt: "disperse",
      description: "Send tokens to multiple recipients at once",
      more: "Great for rewarding followers or paying contributors",
    },
    {
      title: "Vesting",
      image: "vesting-payment.png",
      imageAlt: "vesting",
      description: "Create a token vesting schedule for a recipient",
      more: "Great for distributing tokens over time to your team or investors",
    },
    {
      title: "Stream",
      image: "stream-payment.png",
      imageAlt: "stream",
      description: "Send tokens continuously by the second",
      more: "Create real-time subscriptions, salaries, or vesting",
    },
    {
      title: "Airdrop",
      image: "airdrop-payment.png",
      imageAlt: "airdrop",
      description: "Send token rewards for recipients to claim",
      more: "Reward liquidity providers, users, or communities",
    },
    {
      title: "Escrow",
      image: "escrow-payment.png",
      imageAlt: "escrow",
      description: "Collect yield in an escrow account until redemption",
      more: "Partnerships, security deposites, & pools",
    },
    {
      title: "Private payment",
      image: "private-payment.png",
      imageAlt: "private",
      description: "Send tokens secretly",
      more: "Use for private transactions or avoiding censorship",
    },
  ];
  const paymentsGrid = paymentsTypes.map((payment, index) => (
    <Box
      key={index}
      role={"group"}
      p={6}
      m="5"
      maxW={"430px"}
      minW={"230px"}
      w={"full"}
      bg={"white"}
      boxShadow={"2xl"}
      rounded={"lg"}
      pos={"relative"}
      zIndex={1}
    >
      <Link href={"/payments/" + payment.imageAlt}>
        <a>
          <Box
            rounded={"lg"}
            mt={-12}
            pos={"static"}
            height={"230px"}
            _after={{
              transition: "all .3s ease",
              content: '""',
              w: "full",
              h: "full",
              pos: "absolute",
              top: 5,
              left: 0,
              backgroundImage: `${payment.image})`,
              filter: "blur(15px)",
              zIndex: -1,
            }}
            _groupHover={{
              _after: {
                filter: "blur(20px)",
              },
            }}
          >
            <Image
              rounded={"lg"}
              height={230}
              width={282}
              objectFit={"cover"}
              src={payment.image}
              alt={payment.imageAlt}
            />
          </Box>

          <Stack pt={10} align={"center"}>
            <Heading fontSize={"2xl"} fontFamily={"body"} fontWeight={500}>
              {payment.title}
            </Heading>
            <Text color={"gray.600"}>{payment.description}</Text>

            <Text color={"gray.500"} fontSize={"sm"}>
              {" "}
              {payment.more}
            </Text>
            {/* </Stack> */}
          </Stack>
        </a>
      </Link>
    </Box>
  ));

  return (
    <>
      <Head>
        <title>Paymagic | Payment Types </title>
        <meta name="description" content="Fill in" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Sidebar>
        <SimpleGrid columns={3} spacing={5} justifyContent="center">
          {/* <Box minH="24" mx="auto" maxW={{ base: "full", md: "md" }}> */}
          {/* <Stack
                    direction="row"
                    h="full"
                    spacing="6"
                    justifyContent="center"
                    alignItems="center"
                    p="2"
                  > */}

          {paymentsGrid}
          {/* </Stack> */}
          {/* </Box> */}
        </SimpleGrid>
        <Footer />
      </Sidebar>
    </>
    // <>
    //   <Head>
    //     <title>Paymagic | Payment Types </title>
    //     <meta name="description" content="Fill in" />
    //     <link rel="icon" href="/favicon.ico" />
    //   </Head>
    //   <Header />
    //   <Container justifyContent="center">
    //     <Sidebar />
    //     {/* <AddressesContext.Provider value={providerAddresses}> */}
    //     <Flex justifyContent="center" flexWrap="wrap">
    //       {chainId !== 137 ? <ConnectionAlert /> : null}{" "}
    //       <Text fontSize="6xl" justifyContent="center">
    //         <strong>💳 Payment Types</strong>
    //       </Text>{" "}
    //       <Divider my={5} />
    //     </Flex>

    //     <SimpleGrid minChildWidth="220px" spacing={5} justifyContent="center">
    //       {paymentsGrid}
    //     </SimpleGrid>

    //     {/* </AddressesContext.Provider> */}
    //   </Container>

    //   <Footer />
    // </>
  );
}

export default PaymentsPage;
