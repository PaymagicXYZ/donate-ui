import { createContext, useContext } from "react";

export const ConfigContext = createContext({
  isDevMode: false,
  isDarkMode: false,
  setDevMode: (isDevMode: boolean) => {},
  setDarkMode: (isDarkMode: boolean) => {},
});

export const useConfig = () => {
  const config = useContext(ConfigContext);
  return config;
};
