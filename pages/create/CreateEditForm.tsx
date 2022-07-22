import { useRef, useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { SupabaseContext } from "../../lib/SupabaseProvider";
import {
  Box,
  Button as ChakraButton,
  FormControl,
  FormLabel as ChakraFormLabel,
  IconButton,
  Input as ChakraInput,
  Text,
  Flex,
  Textarea,
  Spacer,
  Image,
} from "@chakra-ui/react";
import AddIcon from "../../components/Icons/Plus";
import Button from "../../components/Button";
import { useEthers } from "@usedapp/core";
import { unSlugifyString } from "../../utils";

const INITIAL_STATE = {
  logo: null,
  slug: "unchain",
  title: "",
  description: "",
  learnMoreLink: "",
  recipientAddress: "",
};

const FormLabel = (props) => (
  <ChakraFormLabel
    marginTop="24px"
    fontWeight={600}
    fontSize="14px"
    {...props}
  />
);

const Input = (props) => (
  <ChakraInput
    _placeholder={{
      color: "input.placeholder",
      opacity: 0.4,
    }}
    bg="input.active"
    border="0"
    _focus={{
      boxShadow: "none",
      bg: "input.hover",
    }}
    borderRadius="6px"
    fontSize="input"
    {...props}
  />
);

const CauseInputWrapper = (props) => (
  <Box marginBottom="20px" {...props}>
    {props.children}
  </Box>
);

const CreateEditForm = () => {
  const fileRef = useRef(null);
  const supabase = useContext(SupabaseContext);
  const {
    query: { slugToCreate },
  } = useRouter();
  const { account } = useEthers();
  const [isCustomWallet, setCustomWallet] = useState(false);
  const [formState, setFormState] = useState(INITIAL_STATE);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    setFormState({
      ...formState,
      slug: slugToCreate as string,
      title: unSlugifyString(slugToCreate as string),
    });
  }, [slugToCreate]);

  useEffect(() => {
    if (!!account && !isCustomWallet)
      setFormState({ ...formState, recipientAddress: account });
    else {
      setFormState({ ...formState, recipientAddress: "" });
    }
  }, [account, isCustomWallet]);

  const handleSubmit = async () => {
    console.log(formState);
    // setLoading(true);
    // const { url, title, blurb, learnMoreLink, recipientAddress, donationName } =
    //   formState;
    // const causeToCreate = {
    //   url,
    //   title,
    //   blurb,
    //   learn_more_link: learnMoreLink,
    //   donation_address: recipientAddress,
    //   donation_name: donationName,
    // };

    // setLoading(true);
    // const { data, error } = await supabase
    //   .from("cause")
    //   .insert(causeToCreate)
    //   .single();

    // setLoading(false);
    // if (data) router.push(`/${data.url}`);
  };
  const handleFileClick = () => {
    fileRef.current.click();
  };

  const handleInputChange = (e) => {
    setFormState({ ...formState, logo: e.target.files[0] });
  };

  const canPublish = Object.values(formState).every((field) => !!field);

  return (
    <FormControl>
      <CauseInputWrapper>
        <FormLabel htmlFor="url">Your link</FormLabel>
        <Flex>
          <Text opacity={0.2}>ethgives.to </Text>
          <Text opacity={0.2} mx="8px" fontWeight={700}>
            /
          </Text>
          <Text fontWeight={700} opacity={0.5}>
            {formState.slug}
          </Text>
        </Flex>
        <FormLabel htmlFor="logo">Add a logo</FormLabel>
        <input
          onChange={handleInputChange}
          ref={fileRef}
          type="file"
          style={{ display: "none" }}
        />

        {!!formState.logo ? (
          <IconButton
            borderRadius="full"
            h="96px"
            w="96px"
            onClick={handleFileClick}
            aria-label="add logo"
          >
            <Image
              borderRadius="full"
              h="96px"
              w="96px"
              src={URL.createObjectURL(formState.logo)}
            />
          </IconButton>
        ) : (
          <IconButton
            onClick={handleFileClick}
            icon={<AddIcon h="28.58px" w="28.58px" opacity={0.5} />}
            isRound
            aria-label="add logo"
            h="96px"
            w="96px"
          />
        )}
      </CauseInputWrapper>
      <CauseInputWrapper>
        <FormLabel htmlFor="description">Description</FormLabel>
        <Textarea
          resize="none"
          p="14px"
          _placeholder={{
            color: "input.placeholder",
            opacity: 0.4,
          }}
          bg="input.active"
          border="0"
          _focus={{
            boxShadow: "none",
            bg: "input.hover",
          }}
          borderRadius="6px"
          fontSize="input"
          rows={7}
          onChange={handleChange}
          value={formState.description}
          placeholder="What is the cause and why is it important? How are the funds going to be allocated? Who is going to benefit from this?"
          id="description"
          name="description"
        />
      </CauseInputWrapper>
      <CauseInputWrapper>
        <FormLabel htmlFor="learnMoreLink">Learn more link</FormLabel>
        <Input
          onChange={handleChange}
          value={formState.learnMoreLink}
          placeholder="newspaper.com/my-cause"
          id="learnMoreLink"
          name="learnMoreLink"
        />
      </CauseInputWrapper>
      <CauseInputWrapper>
        <Flex>
          <FormLabel htmlFor="recipientAddress">Recipient address</FormLabel>
          <Spacer />
          <Text
            paddingTop="25px"
            transition="0.2s"
            onClick={() => setCustomWallet(true)}
            _hover={{
              cursor: "pointer",
            }}
            fontSize="12px"
            fontWeight={600}
            marginRight="16px"
            opacity={isCustomWallet ? 1 : 0.5}
          >
            Custom
          </Text>
          <Text
            paddingTop="25px"
            transition="0.2s"
            onClick={() => setCustomWallet(false)}
            _hover={{
              cursor: "pointer",
            }}
            fontSize="12px"
            fontWeight={600}
            opacity={isCustomWallet ? 0.5 : 1}
          >
            Current Wallet
          </Text>
        </Flex>
        <Input
          onChange={handleChange}
          value={formState.recipientAddress}
          placeholder="0x2hD02...."
          id="recipientAddress"
          name="recipientAddress"
          disabled={!isCustomWallet}
        />
      </CauseInputWrapper>
      <Flex>
        <ChakraButton h="48px" variant="ghost" marginRight="18px">
          <Text opacity={0.6} fontWeight={500}>
            Discard
          </Text>
        </ChakraButton>
        <Button
          isDisabled={!canPublish}
          w="full"
          onClick={handleSubmit}
          fontWeight={600}
        >
          {loading ? "Loading" : "Publish Page"}
        </Button>
      </Flex>
    </FormControl>
  );
};

export default CreateEditForm;
