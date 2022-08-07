import { Button, Text } from "@chakra-ui/react";

interface Props {
  showHistory: boolean;
  setShowHistory: (shouldShow: boolean) => void;
}

const HistorySwitch = ({ showHistory, setShowHistory }: Props) => (
  <>
    <Button
      _hover={{
        bg: showHistory ? "rgba(0,0,0,0)" : "rgb(64,64,64)",
      }}
      bg={showHistory ? "rgba(0,0,0,0)" : "rgb(64,64,64)"}
      borderRadius="full"
      onClick={() => setShowHistory(false)}
      _pressed={{
        backgroundColor: "yellow",
      }}
    >
      <Text
        fontSize="16px"
        fontWeight={700}
        color={
          showHistory ? "rgba(128, 128, 128, 1)" : "rgba(255, 255, 255, 0.8)"
        }
      >
        All Causes
      </Text>
    </Button>
    <Button
      animation="slide 0.5s forward"
      _hover={{
        bg: showHistory ? "rgb(64,64,64)" : "rgba(0,0,0,0)",
      }}
      bg={showHistory ? "rgb(64,64,64)" : "rgba(0,0,0,0)"}
      borderRadius="full"
      onClick={() => setShowHistory(true)}
    >
      <Text
        fontSize="16px"
        fontWeight={700}
        color={
          showHistory ? "rgba(255, 255, 255, 0.8)" : "rgba(128, 128, 128, 1)"
        }
      >
        History
      </Text>
    </Button>
  </>
);

export default HistorySwitch;
