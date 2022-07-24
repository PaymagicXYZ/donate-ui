import { useState, useEffect, useContext, useMemo } from "react";
import { useEthers } from "@usedapp/core";
import { SupabaseContext } from "../../lib/SupabaseProvider";
import { debounce } from "lodash";
import CheckCircleIcon from "../../components/Icons/CheckCircle";
import CloseCircleIcon from "../../components/Icons/CloseCircle";
import Account from "../../components/Account";
import { FullHeader } from "../../components/Header";
import {
  Input,
  Container,
  HStack,
  Grid,
  GridItem,
  Box,
  Text,
  Flex,
  Center,
  Spacer,
  Spinner,
} from "@chakra-ui/react";
import CreateEditForm from "./CreateEditForm";
import CauseLink from "../../components/CauseLink";
import DevModeSwitch from "../../components/DevModeSwitch";
import Button from "../../components/Button";
import { slugifyString } from "../../utils";
import { useRouter } from "next/router";
import CauseList from "../../components/CauseList";
import {
  LeftPannel,
  PannelContainer,
  RightPannel,
} from "../../components/Pannels";

const DEBOUNCE_TIME = 300;

export default function Page() {
  const [causeSlug, setCauseSlug] = useState("");
  const [loading, setLoading] = useState(false);
  const [nameTaken, setNameTaken] = useState(false);
  const router = useRouter();
  const { account } = useEthers();

  const supabase = useContext(SupabaseContext);

  const createCause = async () => {
    router.push(`/create/${slugifyString(causeSlug)}`);
  };

  const fetchCause = async (slug: string) => {
    const { data, error } = await supabase
      .from("cause")
      .select("*")
      .eq("slug", slug);
    if (data?.length) {
      setNameTaken(true);
    } else {
      setNameTaken(false);
    }
    setLoading(false);
  };

  const debouncedFetchCause = useMemo(
    () => debounce(fetchCause, DEBOUNCE_TIME),
    []
  );

  useEffect(() => {
    setLoading(true);
    debouncedFetchCause(slugifyString(causeSlug));
  }, [causeSlug]);

  const canCreate = !!causeSlug && !nameTaken && !loading && !!account;

  return (
    <PannelContainer>
      <LeftPannel>
        <Flex direction="column">
          <CauseList col={2} />
        </Flex>
      </LeftPannel>
      <RightPannel>
        <Box marginTop="45px" alignSelf="flex-start">
          <Text
            fontWeight={700}
            fontFamily="donate"
            color="text"
            fontSize="donate"
          >
            Create a link
          </Text>
        </Box>
        <Text fontSize="select" fontWeight={300} opacity={0.6} color="text">
          Want to support a cause? Create a shareable donation page to raise
          funds, easily!
        </Text>
        <Input
          border="0"
          h="input"
          marginTop="24px"
          color="input.placeholder"
          _placeholder={{
            color: "input.placeholder",
          }}
          opacity={0.4}
          _focus={{
            opacity: 1,
          }}
          bg="modal.input"
          value={causeSlug}
          onChange={(e) => setCauseSlug(e.target.value)}
          placeholder="Your Cause"
        />
        <Flex
          marginTop="16px"
          w="full"
          justify="flex-start"
          fontFamily="donate"
          fontSize="medium"
        >
          <Text opacity={0.2} color="text">
            ethgives.to{" "}
          </Text>
          <Text opacity={0.2} mx="8px" fontWeight={700} color="text">
            /
          </Text>
          <Text fontWeight={700} opacity={!!causeSlug ? 0.5 : 0.2} color="text">
            {slugifyString(causeSlug) || "your-cause"}
          </Text>
          <Spacer />
          <Flex direction="column" justify="center">
            {causeSlug.length ? (
              loading ? (
                <Spinner />
              ) : nameTaken ? (
                <CloseCircleIcon />
              ) : (
                <CheckCircleIcon />
              )
            ) : (
              ""
            )}
          </Flex>
        </Flex>
        <Button
          marginTop="24px"
          w="full"
          onClick={createCause}
          isDisabled={!canCreate}
          fontWeight={600}
        >
          Create
        </Button>
      </RightPannel>
    </PannelContainer>
  );
}
