import { Text, HStack, Link, useToast } from "@chakra-ui/react";
import { useState, FC, useEffect, useRef } from "react";
import CopyIcon from "./CopyIcon";
import TwitterIcon from "./TwitterIcon";

interface Props {
  slug: string;
}

const CauseLink: FC<Props> = ({ slug }) => {
  const [twitterLink, setTwitterLink] = useState("");
  const [slugActive, setSlugActive] = useState(false);
  const toast = useToast();
  const ref = useRef(null);

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
      position: "bottom-left",
    });
  };

  return (
    <HStack w="full" spacing={4}>
      <HStack>
        <Text fontFamily="donate" fontSize="link" color="text">
          <Link
            _hover={{
              bgGradient: "linear(90deg, #F46B47 0%, #F763B0 100%);",
              bgClip: "text",
              opacity: 1,
            }}
            _focus={{
              boxShadow: "none",
            }}
            opacity={0.2}
            href="/"
          >
            ethgives.to
          </Link>
        </Text>
        <Text
          opacity={0.2}
          fontWeight={700}
          fontFamily="donate"
          fontSize="link"
          color="text"
        >
          /
        </Text>
        <Text
          ref={ref}
          fontWeight={700}
          fontFamily="donate"
          transition="100ms"
          fontSize="link"
          color="text"
          bgGradient={
            slugActive ? "linear(90deg, #F46B47 0%, #F763B0 100%);" : ""
          }
          bgClip={slugActive ? "text" : ""}
          opacity={slugActive ? 1 : 0.2}
        >
          {slug}
        </Text>
      </HStack>
      <CopyIcon
        onMouseDown={() => setSlugActive(true)}
        onMouseUp={() => setSlugActive(false)}
        onClick={copyToClipBoard}
        opacity={0.2}
      />
      <Link
        onMouseDown={() => setSlugActive(true)}
        onMouseUp={() => setSlugActive(false)}
        href={twitterLink}
        isExternal
        _focus={{ boxShadow: "none" }}
        opacity={0.2}
      >
        <TwitterIcon />
      </Link>
    </HStack>
  );
};

export default CauseLink;
