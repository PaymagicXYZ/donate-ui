import { useState, useContext } from "react";
import { useRouter } from "next/router";
import { SupabaseContext } from "../../lib/SupabaseProvider";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
} from "@chakra-ui/react";

const INITIAL_STATE = {
  url: "unchain",
  title: "Donate to my Thing!",
  blurb: "Help me for xyz reasons",
  learnMoreLink:
    "https://app.supabase.io/project/vkjkosfjwlqfxzxlftsg/editor/17599",
  donationName: "Unchain Fund",
  donationAddress: "0x7c8f8593049eE994E1fAEdf677F0F5a494545224",
};

const CauseInputWrapper = (props) => (
  <Box marginBottom="20px" {...props}>
    {props.children}
  </Box>
);

const CreateEditForm = () => {
  const supabase = useContext(SupabaseContext);
  const router = useRouter();
  const [formState, setFormState] = useState(INITIAL_STATE);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    const { url, title, blurb, learnMoreLink, donationAddress, donationName } =
      formState;
    const causeToCreate = {
      url,
      title,
      blurb,
      learn_more_link: learnMoreLink,
      donation_address: donationAddress,
      donation_name: donationName,
    };

    setLoading(true);
    console.log(supabase.auth);
    const { data, error } = await supabase
      .from("cause")
      .insert(causeToCreate)
      .single();

    setLoading(false);
    if (data) router.push(`/${data.url}`);
  };
  return (
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
        <FormLabel htmlFor="donationName">Recipient Name</FormLabel>
        <Input
          onChange={handleChange}
          value={formState.donationName}
          placeholder="Unchain Fund"
          id="donationName"
          name="donationName"
        />
      </CauseInputWrapper>
      <CauseInputWrapper>
        <FormLabel htmlFor="donationAddress">Recipient Address</FormLabel>
        <Input
          onChange={handleChange}
          value={formState.donationAddress}
          placeholder="0x2hD02...."
          id="donationAddress"
          name="donationAddress"
        />
      </CauseInputWrapper>
      <Button isFullWidth onClick={handleSubmit}>
        {loading ? "Loading" : "Submit"}
      </Button>
    </FormControl>
  );
};

export default CreateEditForm;
