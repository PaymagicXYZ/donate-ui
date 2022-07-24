import { FormControl, FormLabel, Switch } from "@chakra-ui/react";

const DarkModeSwitch = () => {
  const { isDarkMode, setDarkMode: setMode } = useConfig();
  const toggleDarkMode = () => {
    setMode(!isDarkMode);
    // toggleColorMode();
  };
  return (
    <FormControl
      paddingBottom="10px"
      display="flex"
      alignContent="center"
      justifyContent="flex-end"
    >
      <FormLabel fontSize="small" opacity={0.3} color="text">
        Darkmode
      </FormLabel>
      <Switch
        onChange={toggleDarkMode}
        isChecked={isDarkMode}
        colorScheme="twitter"
      />
    </FormControl>
  );
};
