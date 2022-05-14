import { useState } from "react";
import axios from "axios";
import { Container, FormHelperText } from "@chakra-ui/react";
import PageContainer from "../../components/PageContainer/PageContainer";
import { Box, Button, FormControl, FormLabel, Input } from "@chakra-ui/react";

const INITIAL_STATE = {
  url: "",
  title: "",
  blurb: "",
  learnMoreLink: "",
  recipientName: "",
  recipientAddress: "",
};

const CauseInputWrapper = (props) => (
  <Box marginBottom="20px" {...props}>
    {props.children}
  </Box>
);

const CreatePage = () => {
  const [formState, setFormState] = useState(INITIAL_STATE);
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    setLoading(true);
    const {
      url,
      title,
      blurb,
      learnMoreLink,
      recipientAddress,
      recipientName,
    } = formState;
    const causeToCreate = {
      url,
      title,
      blurb,
      learnMoreLink,
      recipient: {
        address: recipientAddress,
        name: recipientName,
      },
    };
    axios
      .post(`/api/causes/${formState.url}`, causeToCreate)
      .then((res) => {
        console.log("Response:", res);
        setLoading(false);
        setFormState(INITIAL_STATE);
      })
      .catch((err) => {
        console.log("Error:", err);
        setLoading(false);
      });
  };

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };
  return (
    <PageContainer>
      <Container maxW="container.sm" py="50px" px="80px">
        <FormControl>
          <CauseInputWrapper>
            <FormLabel htmlFor="url">URL</FormLabel>
            <Input
              onChange={handleChange}
              value={formState.url}
              placeholder="unchain"
              id="url"
              name="url"
            />
            <FormHelperText>
              URL Preview: https://ethgives.to/{formState.url}
            </FormHelperText>
          </CauseInputWrapper>
          <CauseInputWrapper>
            <FormLabel htmlFor="title">Title</FormLabel>
            <Input
              onChange={handleChange}
              value={formState.title}
              placeholder="Donate to my cause!"
              id="title"
              name="title"
            />
          </CauseInputWrapper>
          <CauseInputWrapper>
            <FormLabel htmlFor="blurb">Blurb</FormLabel>
            <Input
              onChange={handleChange}
              value={formState.blurb}
              placeholder="Help me raise funds for x reasons"
              id="blurb"
              name="blurb"
            />
          </CauseInputWrapper>
          <CauseInputWrapper>
            <FormLabel htmlFor="learnMoreLink">Learn More Link</FormLabel>
            <Input
              onChange={handleChange}
              value={formState.learnMoreLink}
              placeholder="https://twitter.com/learnMoreLink..."
              id="learnMoreLink"
              name="learnMoreLink"
            />
          </CauseInputWrapper>
          <CauseInputWrapper>
            <FormLabel htmlFor="recipientName">Recipient Name</FormLabel>
            <Input
              onChange={handleChange}
              value={formState.recipientName}
              placeholder="Unchain Fund"
              id="recipientName"
              name="recipientName"
            />
          </CauseInputWrapper>
          <CauseInputWrapper>
            <FormLabel htmlFor="recipientAddress">Recipient Address</FormLabel>
            <Input
              onChange={handleChange}
              value={formState.recipientAddress}
              placeholder="0x2hD02...."
              id="recipientAddress"
              name="recipientAddress"
            />
          </CauseInputWrapper>
          <Button isFullWidth onClick={handleSubmit}>
            {loading ? "Loading" : "Submit"}
          </Button>
        </FormControl>
      </Container>
    </PageContainer>
  );
};

export default CreatePage;
