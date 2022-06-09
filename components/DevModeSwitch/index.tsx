import { Switch, FormControl, FormLabel } from "@chakra-ui/react";
import { useDevMode } from "../../hooks";

export default () => {
  const { isDevMode, setDevMode } = useDevMode();
  return (
    <FormControl
      display="flex"
      alignItems="center"
      justifyContent="center"
      w="15"
    >
      <FormLabel htmlFor="email-alerts" mb="0" color="text">
        Use testnets?
      </FormLabel>
      <Switch
        id="email-alerts"
        isChecked={isDevMode}
        onChange={(e) => setDevMode(e.target.checked)}
      />
    </FormControl>
  );
};
