import { useContext, useEffect, useState } from "react";
import {
  Link,
  Flex,
  Box,
  Text,
  Center,
  HStack,
  IconButton,
} from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useTotalFundsRaised } from "../../hooks";
import { SupabaseContext } from "../../lib/SupabaseProvider";
import CopyIcon from "../Icons/CopyIcon";
import { useToast } from "@chakra-ui/react";

interface CauseData {
  title: string;
  slug: string;
  logo: string;
  recipient_address: string;
}

const CauseCard = (cause: CauseData) => {
  const boldHeader = true;
  const supabase = useContext(SupabaseContext);
  const [linkActive, setLinkActive] = useState(false);
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
          {!!logoURL ? (
            <Image height="96px" width="96px" src={logoURL} />
          ) : (
            <Box height="96px" width="96px" bg="black" borderRadius="full" />
          )}
        </Box>
        <Text fontSize="20px" fontWeight={700} color="text">
          {cause.cause.title}
        </Text>
        <HStack w="full" spacing={4} maxHeight="36px" justify="center">
          <HStack position="relative" marginLeft="-32px">
            <Box
              position="relative"
              fontFamily="donate"
              fontSize="16px"
              w="2px"
              h="24px"
            >
              <Text
                fontWeight={700}
                _hover={{
                  opacity: 0,
                }}
                position="absolute"
                top={0}
                left={0}
                color="text"
                opacity={linkActive ? 0 : 0.2}
                transitionDuration="200ms"
              >
                /
              </Text>
              <Text
                fontWeight={700}
                bgGradient="linear(90deg, #F46B47 0%, #F763B0 100%)"
                bgClip="text"
                position="absolute"
                top={0}
                transitionDuration="200ms"
                left={0}
                opacity={linkActive ? 1 : 0}
              >
                /
              </Text>
            </Box>
            <Box position="relative" fontFamily="donate" fontSize="16px">
              <Text opacity={0} color="text">
                {cause.cause.slug}
              </Text>
              <Text
                fontWeight={700}
                _hover={{
                  opacity: 0,
                }}
                position="absolute"
                top={0}
                left={0}
                color="text"
                opacity={linkActive ? 0 : 0.2}
                transitionDuration="200ms"
              >
                {cause.cause.slug}
              </Text>
              <Text
                fontWeight={700}
                bgGradient="linear(90deg, #F46B47 0%, #F763B0 100%)"
                bgClip="text"
                position="absolute"
                top={0}
                transitionDuration="200ms"
                left={0}
                opacity={linkActive ? 1 : 0}
              >
                {cause.cause.slug}
              </Text>
            </Box>
            <Flex
              flexDirection="column"
              justifyContent="center"
              position="relative"
              fontFamily="donate"
              fontSize="link"
              h="36px"
            >
              <IconButton
                size="sm"
                marginTop="2px"
                _hover={{
                  opacity: 0,
                }}
                position="absolute"
                top={0}
                left={0}
                color="text"
                bg="rgba(0,0,0,0)"
                opacity={0.2}
                transitionDuration="200ms"
                aria-label="copy-link"
                onMouseEnter={() => setLinkActive(true)}
                onMouseLeave={() => setLinkActive(false)}
                onClick={copyToClipBoard}
                icon={<CopyIcon />}
              />
              <IconButton
                size="sm"
                marginTop="2px"
                bgGradient="linear(90deg, #F46B47 0%, #F763B0 100%)"
                position="absolute"
                top={0}
                transitionDuration="200ms"
                left={0}
                opacity={0}
                aria-label="copy-link"
                onMouseEnter={() => setLinkActive(true)}
                onMouseLeave={() => setLinkActive(false)}
                onClick={copyToClipBoard}
                _hover={{
                  opacity: 1,
                }}
                icon={<CopyIcon />}
              />
            </Flex>
          </HStack>
        </HStack>
        <Text fontSize="16px" fontWeight={700} opacity={0.9} color="text">
          ${totalFundsRaised}
        </Text>
      </Flex>
    </Box>
  );
};

export default CauseCard;
