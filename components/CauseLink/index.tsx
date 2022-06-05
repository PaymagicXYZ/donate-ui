import { Text, HStack, Link, useToast } from "@chakra-ui/react";
import { useState, FC, useEffect } from "react";
import CopyIcon from "./CopyIcon";
import TwitterIcon from "./TwitterIcon";

interface Props {
  slug: string;
}

const CauseLink: FC<Props> = ({ slug }) => {
  const [twitterLink, setTwitterLink] = useState("");
  const toast = useToast();

  useEffect(() => {
    setTwitterLink(
      `http://twitter.com/intent/tweet?text=Join%20me%20in%20supporting%20this%20cause!&url=${window.location.href}`
    );
  });

  const copyToClipBoard = async () => {
    await navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Copied.",
      description: "The link was copied to your clipboard.",
      status: "success",
      position: "bottom-left",
      duration: 1000,
    });
  };

  return (
    <HStack w="full" opacity={0.2} spacing={4}>
      <HStack>
        <Text fontFamily="donate" fontSize="link" color="text">
          ethgives.to
        </Text>
        <Text fontWeight={700} fontFamily="donate" fontSize="link" color="text">
          /
        </Text>
        <Text fontWeight={700} fontFamily="donate" fontSize="link" color="text">
          {slug}
        </Text>
      </HStack>
      <CopyIcon onClick={copyToClipBoard} />
      <Link href={twitterLink} isExternal>
        <TwitterIcon />
      </Link>
    </HStack>
  );
};

export default CauseLink;
