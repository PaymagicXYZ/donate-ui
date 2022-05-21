import { useState, useContext, useEffect } from "react";
import Router, { useRouter } from "next/router";
import { SupabaseContext } from "../../lib/SupabaseProvider";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  useToast,
} from "@chakra-ui/react";
import { useIsSignedIn } from "../../hooks";
import Layout from "../../components/Layout";

const INITIAL_STATE = {
  url: "",
  title: "",
  blurb: "",
  learn_more_link: "",
  donation_name: "",
  donation_address: "",
};

const CauseInputWrapper = (props) => (
  <Box marginBottom="20px" {...props}>
    {props.children}
  </Box>
);

const EditCause = () => {
  const supabase = useContext(SupabaseContext);
  const router = useRouter();
  const [formState, setFormState] = useState(INITIAL_STATE);
  const [loading, setLoading] = useState(false);
  const isSignedIn = useIsSignedIn();
  const toast = useToast();

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const fetchCause = async () => {
    const { data, error } = await supabase
      .from("cause")
      .select("*")
      .eq("url", router.query.cause)
      .single();
    if (data) setFormState(data);
  };

  useEffect(() => {
    if (router.query.cause) fetchCause();
  }, [router]);

  const handleSubmit = async () => {
    setLoading(true);
    setLoading(true);
    const { data, error } = await supabase
      .from("cause")
      .update(formState)
      .eq("url", router.query.cause)
      .single();

    if (data) {
      toast({
        title: "Changes saved.",
        description: "Your changes have been saved successfully.",
        status: "success",
        position: "bottom-left",
      });
    }
    console.log({ data, error });
    setLoading(false);
  };
  return (
    <Layout>
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
          <FormLabel htmlFor="learn_more_link">Learn More Link</FormLabel>
          <Input
            onChange={handleChange}
            value={formState.learn_more_link}
            placeholder="https://twitter.com/learn_more_link..."
            id="learn_more_link"
            name="learn_more_link"
          />
        </CauseInputWrapper>
        <CauseInputWrapper>
          <FormLabel htmlFor="donation_name">Recipient Name</FormLabel>
          <Input
            onChange={handleChange}
            value={formState.donation_name}
            placeholder="Unchain Fund"
            id="donation_name"
            name="donation_name"
          />
        </CauseInputWrapper>
        <CauseInputWrapper>
          <FormLabel htmlFor="donation_address">Recipient Address</FormLabel>
          <Input
            onChange={handleChange}
            value={formState.donation_address}
            placeholder="0x2hD02...."
            id="donation_address"
            name="donation_address"
          />
        </CauseInputWrapper>
        <Button isFullWidth onClick={handleSubmit}>
          {loading ? "Loading" : "Save"}
        </Button>
      </FormControl>
    </Layout>
  );
};

export default EditCause;
