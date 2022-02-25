import { Box, HStack, Text } from "@chakra-ui/react";
import { useSteps } from "./useSteps";
import { Steps } from "./Steps";
import { ApproveIndividualToken } from "./ApproveIndividualToken";
export const ApproveTokenInSteps = ({ selectedFlatRows }) => {
  const { nextStep, prevStep, reset, activeStep } = useSteps({
    initialStep: 0,
  });

  return (
    <Box mx="auto" maxW="2xl" py="10" px={{ base: "6", md: "8" }} minH="400px">
      <Steps activeStep={activeStep}>
        {selectedFlatRows?.map((row, i) => {
          return <ApproveIndividualToken token={row.cells} i={i} key={i} />;
        })}
      </Steps>
      <HStack
        display={activeStep === selectedFlatRows?.length ? "flex" : "none"}
        mt="10"
        spacing="4"
        shouldWrapChildren
      >
        <Text>✅ All approvals complete</Text>
      </HStack>
    </Box>
  );
};
