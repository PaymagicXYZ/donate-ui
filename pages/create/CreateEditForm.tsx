import { useRef, useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { SupabaseContext } from "../../lib/SupabaseProvider";
import { v4 as uuid } from "uuid";
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
import { useSignIn } from "../../hooks";

const INITIAL_STATE = {
  logo: null,
  slug: "",
  title: "",
  description: "",
  learnMoreLink: "",
  recipientAddress: "",
};

const FormLabel = (props) => (
  <ChakraFormLabel
    marginTop="32px"
    marginBottom="16px"
    fontWeight={400}
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
    color="text"
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
  const { signIn } = useSignIn();
  const router = useRouter();
  const { account } = useEthers();
  const [isCustomWallet, setCustomWallet] = useState(false);
  const [formState, setFormState] = useState(INITIAL_STATE);
  const [loading, setLoading] = useState(false);
  const {
    query: { slugToCreate },
  } = router;

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (!formState.slug.length && !!slugToCreate) {
      setFormState({
        ...formState,
        slug: slugToCreate as string,
        title: unSlugifyString(slugToCreate as string),
      });
    }
  });

  useEffect(() => {
    if (!!account && !isCustomWallet)
      setFormState({ ...formState, recipientAddress: account });
    else {
      setFormState({ ...formState, recipientAddress: "" });
    }
  }, [account, isCustomWallet]);

  const uploadLogo = async () => {
    const { logo } = formState;
    const { data, error } = await supabase.storage
      .from("logos")
      .upload(`${uuid()}-${logo.name}`, logo);
    if (data) return data.Key;
  };

  const handleSubmit = async () => {
    setLoading(true);
    const logoURL = await uploadLogo();
    await signIn();
    const { slug, title, description, learnMoreLink, recipientAddress } =
      formState;
    const causeToCreate = {
      slug,
      title,
      description,
      learn_more_link: learnMoreLink,
      recipient_address: recipientAddress,
      creator_address: account,
      logo: logoURL,
    };

    setLoading(true);
    const { data, error } = await supabase
      .from("cause")
      .insert(causeToCreate)
      .single();

    setLoading(false);
    if (data) router.push(`/${data.slug}`);
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
        <Flex>
          <Text opacity={0.2} color="text">
            ethgives.to{" "}
          </Text>
          <Text opacity={0.2} mx="8px" fontWeight={700} color="text">
            /
          </Text>
          <Text fontWeight={700} opacity={0.5} color="text">
            {formState.slug}
          </Text>
        </Flex>
        <FormLabel color="text" htmlFor="logo">
          Add a logo
        </FormLabel>
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
            color="text"
            bg="rgba(255, 255, 255, 0.07)"
            _hover={{
              bg: "rgba(255, 255, 255, 0.15)",
            }}
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
        <FormLabel htmlFor="description" color="text">
          Description
        </FormLabel>
        <Textarea
          color="text"
          resize="none"
          p="14px"
          _placeholder={{
            color: "input.placeholder",
            opacity: 0.4,
            fontWeight: 400,
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
        <FormLabel color="text" htmlFor="learnMoreLink">
          Learn more link
        </FormLabel>
        <Input
          onChange={handleChange}
          value={formState.learnMoreLink}
          placeholder="newspaper.com/my-cause"
          _placeholder={{
            fontWeight: 400,
          }}
          id="learnMoreLink"
          name="learnMoreLink"
        />
      </CauseInputWrapper>
      <CauseInputWrapper>
        <Flex>
          <FormLabel color="text" htmlFor="recipientAddress">
            Recipient address
          </FormLabel>
          <Spacer />
          <Text
            color="text"
            paddingTop="25px"
            transition="0.2s"
            onClick={() => setCustomWallet(true)}
            _hover={{
              cursor: "pointer",
            }}
            fontSize="12px"
            fontWeight={400}
            marginRight="16px"
            opacity={isCustomWallet ? 1 : 0.5}
          >
            Custom
          </Text>
          <Text
            color="text"
            paddingTop="25px"
            transition="0.2s"
            onClick={() => setCustomWallet(false)}
            _hover={{
              cursor: "pointer",
            }}
            fontSize="12px"
            fontWeight={400}
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
        <ChakraButton
          onClick={() => router.push("/create")}
          h="48px"
          variant="ghost"
          marginRight="18px"
          _hover={{
            bg: "rgb(61,61,61)",
          }}
        >
          <Text opacity={0.6} fontWeight={500} color="text">
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
