import { Container } from "@chakra-ui/react";
import PageContainer from "../../components/PageContainer/PageContainer";
import DonationForm from "../../components/DonationForm";
import Notifications from "../../components/Notifications";

export default function Page() {
  return (
    <PageContainer>
      <Container maxW="container.sm" py="50px" px="80px">
        <DonationForm />
      </Container>
      <Notifications />
    </PageContainer>
  );
}
