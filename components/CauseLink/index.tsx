import { Text, HStack, Box, useToast } from "@chakra-ui/react";
import { FC } from "react";
import CopyIcon from "./CopyIcon";
import TwitterIcon from "./TwitterIcon";

interface Props {
  slug: string;
}

const CauseLink: FC<Props> = ({ slug }) => {
  const toast = useToast();
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
      <TwitterIcon />
    </HStack>
  );
};

export default CauseLink;
