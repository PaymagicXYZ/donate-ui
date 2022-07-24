import { useState, useEffect, useContext } from "react";
import {
  PannelContainer,
  LeftPannel,
  RightPannel,
} from "../../components/Pannels";
import { useRouter } from "next/router";
import { SupabaseContext } from "../../lib/SupabaseProvider";
import {
  Container,
  HStack,
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
import CauseInfo from "../../components/CauseInfo";
import { Cause } from "../../types/cause";
import DevModeSwitch from "../../components/DevModeSwitch";
import DonationSuccess from "../../components/DonationSuccess";

export default function Page() {
  const supabase = useContext(SupabaseContext);
  const { toggleColorMode, colorMode } = useColorMode();
  const { isDarkMode, setDarkMode: setMode } = useConfig();
  const toggleDarkMode = () => {
    setMode(!isDarkMode);
    // toggleColorMode();
  };
  const {
    query: { cause },
  } = useRouter();
  const [donationMade, setDonationMade] = useState(false);
  const [logoURL, setLogoURL] = useState("");
  const [causeData, setCauseData] = useState<Cause>();
  const [error, setError] = useState(false);

  const fetchLogo = async () => {
    const { data, error } = await supabase.storage
      .from("logos")
      .getPublicUrl(causeData.logo.slice(6));
    setLogoURL(data.publicURL);
  };
  const fetchCause = async () => {
    const { data, error } = await supabase
      .from("cause")
      .select("*")
      .eq("slug", cause);
    if (data?.length) {
      setCauseData(data[0]);
    } else {
      setError(true);
      console.error(error);
    }
  };
  useEffect(() => {
    if (cause) fetchCause();
  }, [cause]);

  useEffect(() => {
    if (causeData) fetchLogo();
  }, [causeData]);

  return (
    <>
      <PannelContainer>
        <LeftPannel>
          <Flex direction="column">
            <CauseInfo causeData={{ ...causeData, logoURL }} />
            <History
              recipentAddress={causeData?.recipient_address}
              causeTitle={causeData?.title}
            />
          </Flex>
        </LeftPannel>
        <RightPannel>
          {donationMade ? (
            <DonationSuccess />
          ) : (
            <>
              <Box marginBottom="16px" marginTop="45px" alignSelf="flex-start">
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
        </RightPannel>
      </PannelContainer>
    </>
  );
}
