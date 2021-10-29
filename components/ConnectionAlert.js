import { Alert, AlertIcon, Text } from "@chakra-ui/react";

function ConnectionAlert() {
  return (
    <Alert status="error" mb={3}>
      <AlertIcon />
      <Text>
        Please connect Metamask and use the <strong>Polygon Mainnet</strong>{" "}
        network
      </Text>
    </Alert>
  );
}

export default ConnectionAlert;
