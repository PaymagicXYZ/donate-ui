import { Box, Text, HStack, Link, useToast } from "@chakra-ui/react";
import { useState, FC, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import CopyIcon from "./CopyIcon";
import TwitterIcon from "./TwitterIcon";

const CauseLink = () => {
  const [twitterLink, setTwitterLink] = useState("");
  const [slugActive, setSlugActive] = useState(false);
  const toast = useToast();
  const ref = useRef(null);
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
      <HStack>
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
            opacity={0}
            fontWeight={boldHeader ? 700 : 400}
          >
            ethgives.to
          </Text>
        </Link>
        {!!cause && (
          <>
            <Text
              opacity={0.2}
              fontWeight={700}
              fontFamily="donate"
              fontSize="link"
              color="text"
            >
              /
            </Text>
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
                opacity={slugActive ? 0 : 0.2}
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
                opacity={slugActive ? 1 : 0}
              >
                {cause}
              </Text>
              {/* <Text
          ref={ref}
          fontWeight={700}
          fontFamily="donate"
          fontSize="link"
          color="text"
          bgGradient={
            slugActive ? "linear(90deg, #F46B47 0%, #F763B0 100%);" : ""
          }
          bgClip={slugActive ? "text" : ""}
          opacity={slugActive ? 1 : 0.2}
          // transitionTimingFunction="cubic-bezier(0, 0, .58, 1)"
        >
          {cause}
        </Text> */}
            </Box>
            <CopyIcon
              onMouseEnter={() => setSlugActive(true)}
              onMouseLeave={() => setSlugActive(false)}
              onClick={copyToClipBoard}
              opacity={0.2}
            />
            <Link
              onMouseEnter={() => setSlugActive(true)}
              onMouseLeave={() => setSlugActive(false)}
              href={twitterLink}
              isExternal
              _focus={{ boxShadow: "none" }}
              opacity={0.2}
            >
              <TwitterIcon />
            </Link>
          </>
        )}
      </HStack>
    </HStack>
  );
};

export default CauseLink;
