import { Spacer, HStack, Text, Flex, Box, Link } from "@chakra-ui/react";
import Address from "./Address";
import { format } from "timeago.js";
import { usePastDonations, useConfig } from "../../hooks";
import ExternalLink from "../Icons/ExternalLink";

interface Props {
  recipentAddress: string;
  causeTitle: string;
}

const History = (props: Props) => {
  const pastDonations = usePastDonations(props.recipentAddress);
  const { isDarkMode } = useConfig();
  return (
    <Flex
      color="text"
      direction="column"
      justify="flex-start"
      alignContent="flex-start"
    >
      <Text fontSize="select" fontWeight={600}>
        History
      </Text>
      <Box
        overflowY="scroll"
        maxH="230px"
        css={{
          "&::-webkit-scrollbar": {
            width: "0px",
          },
          // "&::-webkit-scrollbar-track": {
          //   width: "6px",
          // },
          "&::-webkit-scrollbar-thumb": {
            background: "#ffffff21",
            borderRadius: "24px",
          },
        }}
      >
        {pastDonations.map((donation, i) => (
          <HStack
            key={i}
            fontSize="pastDonation"
            opacity={0.6}
            my="16px"
            color="text"
          >
            <Text fontWeight={600}>
              <Address address={donation.from} />
            </Text>
            <Text>donated</Text>
            <Text fontWeight={600}>
              {donation.value} {donation.symbol}
            </Text>
            <Text>to</Text>
            <Text fontWeight={600}>{props.causeTitle}</Text>
            <Spacer />
            <Text fontSize="small">
              <Link
                textDecoration="none"
                href={`https://kovan.etherscan.io/tx/${donation.transactionHash}`}
                isExternal
              >
                {format(donation.time)}{" "}
                <ExternalLink color={isDarkMode ? "white" : "black"} />
              </Link>
            </Text>
          </HStack>
        ))}
      </Box>
    </Flex>
  );
};

export default History;
