import {
  Box,
  Text,
  HStack,
  Link,
  useToast,
  IconButton,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import CopyIcon from "./CopyIcon";
import TwitterIcon from "./TwitterIcon";

const CauseLink = () => {
  const [twitterLink, setTwitterLink] = useState("");
  const [linkActive, setLinkActive] = useState(false);
  const toast = useToast();
  const {
    query: { cause },
  } = useRouter();

  const boldHeader = !cause;

  useEffect(() => {
    setTwitterLink(
      `http://twitter.com/intent/tweet?text=Join%20me%20in%20supporting%20this%20cause!&url=${window.location.href}`
    );
  });

  const copyToClipBoard = async () => {
    await navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Copied",
      description: "The link was copied to your clipboard.",
      status: "success",
      position: "bottom-right",
    });
  };

  return (
    <HStack w="full" spacing={4} maxHeight="36px">
      <HStack position="relative">
        <Link
          fontFamily="donate"
          fontSize="link"
          position="relative"
          _focus={{
            boxShadow: "none",
          }}
          href="/"
        >
          <Text opacity={0} color="text" fontWeight={boldHeader ? 700 : 400}>
            ethgives.to
          </Text>
          <Text
            _hover={{
              opacity: 0,
            }}
            position="absolute"
            top={0}
            left={0}
            color="text"
            opacity={0.2}
            fontWeight={boldHeader ? 700 : 400}
          >
            ethgives.to
          </Text>
          <Text
            bgGradient="linear(90deg, #F46B47 0%, #F763B0 100%)"
            bgClip="text"
            position="absolute"
            top={0}
            transitionDuration="200ms"
            left={0}
            _hover={{
              opacity: 1,
            }}
            opacity={linkActive ? 1 : 0}
            fontWeight={boldHeader ? 700 : 400}
          >
            ethgives.to
          </Text>
        </Link>
        {!!cause && (
          <>
            <Box
              position="relative"
              fontFamily="donate"
              fontSize="link"
              w="12px"
              h="36px"
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
            <Box position="relative" fontFamily="donate" fontSize="link">
              <Text opacity={0} color="text">
                {cause}
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
                {cause}
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
                {cause}
              </Text>
            </Box>
            <Box
              position="relative"
              fontFamily="donate"
              fontSize="link"
              h="36px"
            >
              <IconButton
                _hover={{
                  opacity: 0,
                }}
                position="absolute"
                top={0}
                left={0}
                color="text"
                opacity={0.2}
                transitionDuration="200ms"
                aria-label="copy-link"
                onMouseEnter={() => setLinkActive(true)}
                onMouseLeave={() => setLinkActive(false)}
                onClick={copyToClipBoard}
                icon={<CopyIcon />}
              />
              <IconButton
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
              <IconButton
                aria-label="twitter-link"
                _hover={{
                  opacity: 0,
                }}
                position="absolute"
                top={0}
                left={10}
                color="text"
                opacity={0.2}
                transitionDuration="200ms"
                onMouseEnter={() => setLinkActive(true)}
                onMouseLeave={() => setLinkActive(false)}
                onClick={() => window.location.replace(twitterLink)}
                _focus={{ boxShadow: "none" }}
                icon={<TwitterIcon />}
              />
              <IconButton
                aria-label="twitter-link"
                bgGradient="linear(90deg, #F46B47 0%, #F763B0 100%)"
                position="absolute"
                top={0}
                transitionDuration="200ms"
                left={10}
                opacity={0}
                onMouseEnter={() => setLinkActive(true)}
                onMouseLeave={() => setLinkActive(false)}
                onClick={() => window.location.replace(twitterLink)}
                _focus={{ boxShadow: "none" }}
                _hover={{
                  opacity: 1,
                }}
                icon={<TwitterIcon />}
              />
            </Box>
          </>
        )}
      </HStack>
    </HStack>
  );
};

export default CauseLink;
