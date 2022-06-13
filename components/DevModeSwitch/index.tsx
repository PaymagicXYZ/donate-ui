import { Switch, FormControl, FormLabel } from "@chakra-ui/react";
import { useDevMode } from "../../hooks";

const DevModeSwitch = () => {
  const { isDevMode, setDevMode } = useDevMode();
  return (
    <FormControl
      display="flex"
      alignItems="center"
      justifyContent="center"
      w="15"
    >
      <FormLabel htmlFor="dev-mode-switch" mb="0" color="text">
        Use testnets?
      </FormLabel>
      <Switch
        id="dev-mode-switch"
        isChecked={isDevMode}
        onChange={(e) => setDevMode(e.target.checked)}
      />
    </FormControl>
  );
};

export default DevModeSwitch;
