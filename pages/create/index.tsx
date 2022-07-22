import { useState, useEffect, useContext, useMemo } from "react";
import { useEthers } from "@usedapp/core";
import { SupabaseContext } from "../../lib/SupabaseProvider";
import { debounce } from "lodash";
import CheckCircleIcon from "../../components/Icons/CheckCircle";
import CloseCircleIcon from "../../components/Icons/CloseCircle";
import Account from "../../components/Account";
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
    <Grid
      templateColumns="repeat(100, 1fr)"
      w="100vw"
      h={["full", "full", "full", "100vh"]}
    >
      <GridItem
        colSpan={[100, 100, 100, 55]}
        p="0"
        m="0"
        bg="leftPanel"
        overflowY="auto"
        css={{
          "&::-webkit-scrollbar": {
            width: "0px",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "#ffffff21",
            borderRadius: "24px",
          },
        }}
      >
        <Container my="60px" px="30px">
          <Flex direction="column">
            <CauseLink />
            {/* <CreateEditForm /> */}
            <CauseList col={2} />
          </Flex>
        </Container>
      </GridItem>
      <GridItem
        overflowY="auto"
        css={{
          "&::-webkit-scrollbar": {
            width: "0px",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "#ffffff21",
            borderRadius: "24px",
          },
        }}
        colSpan={[100, 100, 100, 45]}
        p="0"
        m="0"
        h="100vh"
        bg="rightPanel"
      >
        <Container my="60px" px="100px" h="calc(100% - 120px)">
          <Flex
            h="full"
            marginBottom="10px"
            p="0"
            align="flex-start"
            direction="column"
          >
            <HStack w="full" justifyContent="flex-end">
              {process.env.NEXT_PUBLIC_DEBUG && <DevModeSwitch />}
              <Account />
            </HStack>
            <Center w="full" h="full" flexDirection="column">
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
              <Text fontSize="select" fontWeight={300} opacity={0.6}>
                Want to support a cause? Create a shareable donation page to
                raise funds, easily!
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
                <Text opacity={0.2}>ethgives.to </Text>
                <Text opacity={0.2} mx="8px" fontWeight={700}>
                  /
                </Text>
                <Text fontWeight={700} opacity={!!causeSlug ? 0.5 : 0.2}>
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
            </Center>
          </Flex>
        </Container>
      </GridItem>
    </Grid>
  );
}
