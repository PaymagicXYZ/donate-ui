import { VStack, Text } from "@chakra-ui/react";
import Address from "./Address";
import { usePastDonations } from "../../hooks";
import { shortenAddress } from "../../utils";

interface Props {
  recipentAddress: string;
}

const History = (props: Props) => {
  const pastDonations = usePastDonations(props.recipentAddress);

  return (
    <VStack justify="flex-start" alignContent="flex-start">
      <Text fontSize="2xl">History</Text>;
      {pastDonations.map((donation, i) => (
        <Text key={i}>
          <Address address={donation.from} />
          donated {donation.value} {donation.symbol}
        </Text>
      ))}
    </VStack>
  );
};

export default History;
