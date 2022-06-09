import { Switch, FormControl, FormLabel } from "@chakra-ui/react";
import { useDevMode } from "../../hooks";

export default () => {
  const { isDevMode, setDevMode } = useDevMode();
  const change = (isDevMode) => {
    console.log("setting dev mode", isDevMode);
    setDevMode(isDevMode);
  };
  return (
    <FormControl display="flex" alignItems="center" justifyContent="center">
      <FormLabel htmlFor="email-alerts" mb="0" color="text">
        Use testnets?
      </FormLabel>
      <Switch
        id="email-alerts"
        isChecked={isDevMode}
        onChange={(e) => change(e.target.checked)}
      />
    </FormControl>
  );
};
