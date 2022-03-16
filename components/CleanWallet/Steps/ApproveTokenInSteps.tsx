import { useState } from "react";
import { Box, Button, Center, HStack, Text } from "@chakra-ui/react";
import { useSteps } from "./Hook/useStepsHook";
import { Steps } from "./Steps";
import { ApproveIndividualToken } from "./ApproveIndividualToken";
export const ApproveTokenInSteps = ({
  selectedFlatRows,
  onClose,
  signedTokens,
  signedTokensCallback,
}) => {
  const { nextStep, prevStep, reset, activeStep } = useSteps({
    initialStep: 0,
  });

  const [signedTx, setSignedTx] = useState([signedTokens]);

  function updateAndClose() {
    signedTokensCallback([...signedTx]);
    onClose();
  }
  return (
    <Box mx="auto" maxW="2xl" py="10" px={{ base: "6", md: "8" }} minH="400px">
      <Steps activeStep={activeStep}>
        {selectedFlatRows?.map((row, i) => {
          return (
            <ApproveIndividualToken
              {...{ activeStep, signedTx, setSignedTx }}
              length={selectedFlatRows.length}
              nextStep={nextStep}
              token={row.cells}
              i={i}
              key={i}
            />
          );
        })}
      </Steps>
      <Box
        display={activeStep === selectedFlatRows?.length ? "flex" : "none"}
        mt="10"
      >
        <Text>
          ✅ &nbsp; All approvals complete, you’ll receive ETH in your wallet
          shortly.
        </Text>
      </Box>
      <br />
      <Center
        display={activeStep === selectedFlatRows?.length ? "flex" : "none"}
      >
        <Button onClick={updateAndClose}>Back to home</Button>
      </Center>
    </Box>
  );
};
