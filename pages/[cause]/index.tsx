import { useState, useEffect, useContext } from "react";
import Account from "../../components/Account";
import { useRouter } from "next/router";
import useSWR from "swr";
import { SupabaseContext } from "../../lib/SupabaseProvider";
import {
  Container,
  HStack,
  VStack,
  Box,
  Spinner,
  Spacer,
  Text,
  Flex,
  Switch,
  Center,
} from "@chakra-ui/react";
import PageContainer from "../../components/PageContainer/PageContainer";
import DonationForm from "../../components/DonationForm";
import Notifications from "../../components/Notifications";
import History from "../../components/History";
import CauseLink from "../../components/CauseLink";
import CauseInfo from "../../components/CauseInfo";
import { Cause } from "../../types/cause";
import DevModeSwitch from "../../components/DevModeSwitch";
import DonationSuccess from "../../components/DonationSuccess";

export default function Page() {
  const supabase = useContext(SupabaseContext);
  const {
    query: { cause },
  } = useRouter();
  const [donationMade, setDonationMade] = useState(false);
  const [causeData, setCauseData] = useState<Cause>();
  const [error, setError] = useState(false);
  const fetchCause = async () => {
    const { data, error } = await supabase
      .from("cause")
      .select("*")
      .eq("url", cause);
    if (data.length) setCauseData(data[0]);
    else {
      setError(true);
      console.error(error);
    }
  };
  useEffect(() => {
    if (cause) fetchCause();
  }, [cause]);
  return (
    <HStack w="full" h="full" spacing="0">
      <Box
        w="55vw"
        p="0"
        m="0"
        h="100vh"
        bg="rgb(45, 45, 45)"
        overflowY="auto"
        css={{
          "&::-webkit-scrollbar": {
            width: "0px",
          },
          // "&::-webkit-scrollbar-track": {
          //   width: "6px",
          // },
          "&::-webkit-scrollbar-thumb": {
            background: "#ffffff21",
            borderRadius: "24px",
          },
        }}
        // bgGradient="radial(63.39% 55.09% at 50% 46.23%, rgba(0, 0, 0, 0.15) 0%, rgba(255, 255, 255, 0.07) 0.01%, rgba(0, 0, 0, 0.1) 130%, #FFFFFF 130%)"
      >
        <Container my="60px" px="30px">
          <Flex direction="column">
            <CauseLink slug={cause} />
            <CauseInfo causeData={causeData} />
            <History
              recipentAddress={causeData?.donation_address}
              causeTitle={causeData?.title}
            />
          </Flex>
        </Container>
      </Box>

      <Box
        overflowY="auto"
        css={{
          "&::-webkit-scrollbar": {
            width: "0px",
          },
          // "&::-webkit-scrollbar-track": {
          //   width: "6px",
          // },
          "&::-webkit-scrollbar-thumb": {
            background: "#ffffff21",
            borderRadius: "24px",
          },
        }}
        w="45vw"
        p="0"
        m="0"
        h="100vh"
        bg="rightPannel"
      >
        <Container my="60px" px="100px" h="full">
          <Flex h="70vh" m="0" p="0" align="flex-start" direction="column">
            <HStack w="full" justifyContent="flex-end">
              {process.env.NEXT_PUBLIC_DEBUG && <DevModeSwitch />}
              <Account />
            </HStack>
            {donationMade ? (
              <DonationSuccess />
            ) : (
              <>
                <Box marginBottom="16px" marginTop="45px">
                  <Text
                    fontWeight={700}
                    fontFamily="donate"
                    color="text"
                    fontSize="donate"
                  >
                    Donate
                  </Text>
                </Box>
                <DonationForm
                  causeData={causeData}
                  setDonationMade={setDonationMade}
                />
              </>
            )}
          </Flex>
        </Container>
      </Box>
    </HStack>
    // <PageContainer>
    //   {error ? (
    //     <h1>Cause not found</h1>
    //   ) : causeData ? (
    //     <HStack justify="space-around" alignContent="flex-start">
    //       <History recipentAddress={causeData.donation_address} />
    //       <DonationForm causeData={causeData} />
    //     </HStack>
    //   ) : (
    //     <Spinner size="lg">Loading</Spinner>
    //   )}
    //   <Notifications />
    // </PageContainer>
  );
}
