import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import { SupabaseContext } from "../../lib/SupabaseProvider";
import { Container, HStack, Spinner, Spacer } from "@chakra-ui/react";
import PageContainer from "../../components/PageContainer/PageContainer";
import DonationForm from "../../components/DonationForm";
import Notifications from "../../components/Notifications";
import History from "../../components/History";
import { Cause } from "../../types/cause";

export default function Page() {
  const supabase = useContext(SupabaseContext);
  const {
    query: { cause },
  } = useRouter();
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
    <PageContainer>
      {error ? (
        <h1>Cause not found</h1>
      ) : causeData ? (
        <HStack justify="space-around" alignContent="flex-start">
          <History recipentAddress={causeData.donation_address} />
          <DonationForm causeData={causeData} />
        </HStack>
      ) : (
        <Spinner size="lg">Loading</Spinner>
      )}
      <Notifications />
    </PageContainer>
  );
}
