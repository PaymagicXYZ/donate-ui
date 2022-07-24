import { Grid } from "@chakra-ui/react";

export const PannelContainer = ({ children }) => (
  <Grid
    templateColumns="repeat(100, 1fr)"
    w="100vw"
    h={["full", "full", "full", "100vh"]}
  >
    {children}
  </Grid>
);
