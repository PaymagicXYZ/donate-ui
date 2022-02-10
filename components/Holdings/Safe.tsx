import React, { useEffect } from "react";
import {
  Box,
  Heading,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Text,
  Link,
} from "@chakra-ui/react";

export default function Safe(inputChain, version, creator, owners) {
  const displayAddress = (address) => (
    <Link href={`/accounts/${inputChain}/${address}`} color="teal.500">
      {address}
    </Link>
  );

  return (
    <>
      <Text>
        This {version} safe is created by {displayAddress(creator)}
        <br />
        The owners of the safe:
        <br />
        {owners.map((owner) => (
          <>
            {displayAddress(owner)} <br />
          </>
        ))}
      </Text>
    </>
  );
}
