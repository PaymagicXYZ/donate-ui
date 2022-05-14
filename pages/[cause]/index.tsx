import { useRouter } from "next/router";
import useSWR from "swr";
import { Container, Spinner } from "@chakra-ui/react";
import PageContainer from "../../components/PageContainer/PageContainer";
import DonationForm from "../../components/DonationForm";
import Notifications from "../../components/Notifications";

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    const info = await res.json();
    const error = new Error(info);
    throw error;
  }
  return res.json();
};

export default function Page() {
  const {
    query: { cause },
  } = useRouter();
  const { data, error } = useSWR(`/api/causes/${cause}`, fetcher);
  return (
    <PageContainer>
      <Container maxW="container.sm" py="50px" px="80px">
        {error ? (
          <h1>Cause not found</h1>
        ) : data ? (
          <DonationForm causeData={data} />
        ) : (
          <Spinner size="lg">Loading</Spinner>
        )}
      </Container>
      <Notifications />
    </PageContainer>
  );
}
