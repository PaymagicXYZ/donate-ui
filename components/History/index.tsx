import { Spacer, HStack, Text, Flex, Box, Link } from "@chakra-ui/react";
import Address from "../Address";
import { format } from "timeago.js";
import { usePastDonations, useConfig } from "../../hooks";
import ExternalLink from "../Icons/ExternalLink";
import { BLOCK_EXPLORERS } from "../../utils/constants";
import { formatAmount } from "../../utils";

interface Props {
  recipentAddress: string;
  causeTitle: string;
}

const History = (props: Props) => {
  const pastDonations = usePastDonations(props.recipentAddress);
  const { isDarkMode } = useConfig();
  return pastDonations.length ? (
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
            {" "}
            <Address
              fontWeight={600}
              address={donation.from}
              chainId={donation.chainId}
            />
            <Text>donated</Text>
            <Text fontWeight={600} textOverflow="ellipsis">
              {formatAmount(donation.value)} {donation.symbol}
            </Text>
            <Text>to</Text>
            <Text
              textOverflow="ellipsis"
              fontWeight={600}
              whiteSpace="nowrap"
              maxW="5px"
            >
              {props.causeTitle}
            </Text>
            <Spacer />
            <Text fontSize="small">
              <Link
                textDecoration="none"
                href={`${BLOCK_EXPLORERS[donation.chainId]}/tx/${
                  donation.transactionHash
                }`}
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
  ) : (
    <div />
  );
};

export default History;
