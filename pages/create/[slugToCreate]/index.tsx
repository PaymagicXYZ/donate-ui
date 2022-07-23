import { useState, useEffect, useContext, useMemo } from "react";
import { useEthers } from "@usedapp/core";
import { SupabaseContext } from "../../../lib/SupabaseProvider";
import { debounce } from "lodash";
import CheckCircleIcon from "../../../components/Icons/CheckCircle";
import Account from "../../../components/Account";
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
} from "@chakra-ui/react";
import CreateEditForm from "../CreateEditForm";
import DevModeSwitch from "../../../components/DevModeSwitch";
import { slugifyString, unSlugifyString } from "../../../utils";
import { useRouter } from "next/router";

const DEBOUNCE_TIME = 600;

const CreatePage = () => {
  const [causeSlug, setCauseSlug] = useState("");
  const [loading, setLoading] = useState(false);
  const [nameTaken, setNameTaken] = useState(false);
  const {
    query: { slugToCreate },
  } = useRouter();
  const { account } = useEthers();
  const title = unSlugifyString(slugToCreate as string);

  const supabase = useContext(SupabaseContext);

  const fetchCause = async (slug: string) => {
    const { data, error } = await supabase
      .from("cause")
      .select("*")
      .eq("url", slug);
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
            <Text fontWeight={700} fontSize="donate" color="text">
              {title}
            </Text>
            <CreateEditForm />
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
              <Text
                fontSize="select"
                fontWeight={300}
                opacity={0.6}
                color="text"
              >
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
                isDisabled
                value={title}
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
                <Text color="text" opacity={0.2}>
                  ethgives.to{" "}
                </Text>
                <Text color="text" opacity={0.2} mx="8px" fontWeight={700}>
                  /
                </Text>
                <Text
                  fontWeight={700}
                  opacity={!!causeSlug ? 0.5 : 0.2}
                  color="text"
                >
                  {slugToCreate}
                </Text>
                <Spacer />
                <Flex direction="column" justify="center">
                  <CheckCircleIcon />
                </Flex>
              </Flex>
            </Center>
          </Flex>
        </Container>
      </GridItem>
    </Grid>
  );
};

export default CreatePage;
