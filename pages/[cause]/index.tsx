import { useState, useEffect, useContext } from "react";
import Account from "../../components/Account";
import { useRouter } from "next/router";
import { SupabaseContext } from "../../lib/SupabaseProvider";
import {
  Spacer,
  Container,
  HStack,
  Grid,
  GridItem,
  Box,
  Text,
  Flex,
  Center,
  Switch,
  FormControl,
  FormLabel,
  useColorMode,
} from "@chakra-ui/react";
import { useConfig } from "../../hooks/useConfig";
import DonationForm from "../../components/DonationForm";
import History from "../../components/History";
import CauseLink from "../../components/CauseLink";
import CauseInfo from "../../components/CauseInfo";
import { Cause } from "../../types/cause";
import DevModeSwitch from "../../components/DevModeSwitch";
import DonationSuccess from "../../components/DonationSuccess";

export default function Page() {
  const supabase = useContext(SupabaseContext);
  const { toggleColorMode, colorMode } = useColorMode();
  const { isDarkMode, setDarkMode: setMode } = useConfig();
  console.log({ colorMode });
  const toggleDarkMode = () => {
    setMode(!isDarkMode);
    // toggleColorMode();
  };
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
    <Grid
      templateColumns="repeat(100, 1fr)"
      w="100vw"
      h={["full", "full", "full", "100vh"]}
    >
      <GridItem
        colSpan={[100, 100, 100, 55]}
        p="0"
        m="0"
        // h="100vh"
        bg="leftPanel"
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
      </GridItem>

      <GridItem
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
        colSpan={[100, 100, 100, 45]}
        p="0"
        m="0"
        h="100vh"
        bg="rightPanel"
      >
        <Container my="60px" px="100px" h="calc(100% - 120px)">
          <Flex
            h="full"
            marginBottom="10px"
            p="0"
            align="flex-start"
            direction="column"
          >
            <HStack w="full" justifyContent="flex-end">
              {process.env.NEXT_PUBLIC_DEBUG && <DevModeSwitch />}
              <Account />
            </HStack>
            {donationMade ? (
              <DonationSuccess />
            ) : (
              <Center w="full" h="full" flexDirection="column">
                <Box
                  marginBottom="16px"
                  marginTop="45px"
                  alignSelf="flex-start"
                >
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
              </Center>
            )}
            <FormControl
              paddingBottom="10px"
              display="flex"
              alignContent="center"
              justifyContent="flex-end"
            >
              <FormLabel fontSize="small" opacity={0.3} color="text">
                Darkmode
              </FormLabel>
              <Switch
                onChange={toggleDarkMode}
                isChecked={isDarkMode}
                colorScheme="twitter"
              />
            </FormControl>
          </Flex>
        </Container>
      </GridItem>
    </Grid>
  );
}
