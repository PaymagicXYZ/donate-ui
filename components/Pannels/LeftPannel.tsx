import { GridItem, Container, Box } from "@chakra-ui/react";
import { LeftHeader } from "../Header";

export const LeftPannel = ({ children }) => (
  <GridItem
    colSpan={[100, 100, 100, 55]}
    px="124"
    py="62"
    m="0"
    bg="leftPanel"
    overflowY="auto"
    css={{
      "&::-webkit-scrollbar": {
        width: "0px",
      },
      "&::-webkit-scrollbar-thumb": {
        background: "#ffffff21",
        borderRadius: "24px",
      },
    }}
  >
    <Box>
      <LeftHeader />
      {children}
    </Box>
  </GridItem>
);
