import { useContext, useEffect, useState } from "react";
import { Flex, Box, Text, Center } from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useTotalFundsRaised } from "../../hooks";
import { SupabaseContext } from "../../lib/SupabaseProvider";
import { CopyIcon } from "@chakra-ui/icons";
import { useToast } from "@chakra-ui/react";

interface CauseData {
  title: string;
  slug: string;
  logo: string;
  recipient_address: string;
}

const CauseCard = (cause: CauseData) => {
  const supabase = useContext(SupabaseContext);
  const [logoURL, setLogoURL] = useState("");
  const toast = useToast();
  const fetchLogo = async () => {
    const { data, error } = await supabase.storage
      .from("logos")
      .getPublicUrl(cause.cause.logo.slice(6));
    setLogoURL(data.publicURL);
  };
  const totalFundsRaised = useTotalFundsRaised(cause.cause.recipient_address);
  const router = useRouter();
  useEffect(() => {
    fetchLogo();
  }, [cause]);

  const copyToClipBoard = async (e) => {
    e.stopPropagation();
    const url = `${window.location.origin}/${cause.cause.slug}`;
    await navigator.clipboard.writeText(url);
    toast({
      title: "Copied",
      description: "The link was copied to your clipboard.",
      status: "success",
      position: "bottom-right",
    });
  };

  return (
    <Box
      _hover={{
        cursor: "pointer",
        bg: "rgba(0, 0, 0, 0.6)",
        transition: ".2s",
      }}
      borderRadius="6px"
      h="263px"
      maxW="320px"
      bg="#1A191D"
      onClick={() => router.push(`/${cause.cause.slug}`)}
    >
      <Flex
        direction="column"
        alignItems="center"
        justifyContent="center"
        w="full"
        h="full"
      >
        <Box
          borderRadius="full"
          overflow="hidden"
          w="96px"
          h="96px"
          marginBottom="10px"
        >
          {!!logoURL && <Image height="96px" width="96px" src={logoURL} />}
        </Box>
        <Text fontSize="20px" fontWeight={700} color="text">
          {cause.cause.title}
        </Text>
        <Flex marginBottom="10px">
          <Text color="text" fontSize="16px" fontWeight={700} opacity={0.2}>
            / {cause.cause.slug}
          </Text>
          <Center>
            <CopyIcon
              opacity={0.2}
              marginLeft="8px"
              onClick={copyToClipBoard}
            />
          </Center>
        </Flex>
        <Text fontSize="16px" fontWeight={700} opacity={0.9} color="text">
          ${totalFundsRaised}
        </Text>
      </Flex>
    </Box>
  );
};

export default CauseCard;
