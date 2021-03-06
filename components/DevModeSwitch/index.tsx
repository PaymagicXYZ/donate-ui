import { Switch, FormControl, FormLabel } from "@chakra-ui/react";
import { useConfig } from "../../hooks";

const DevModeSwitch = () => {
  const { isDevMode, setDevMode } = useConfig();
  return (
    <FormControl
      display="flex"
      alignItems="center"
      justifyContent="center"
      w="15"
      marginRight="16px"
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
