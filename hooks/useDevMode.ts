import { createContext, useContext } from "react";

export const DevModeContext = createContext({
  isDevMode: false,
  setDevMode: () => {},
});

export const useDevMode = () => {
  const devMode = useContext(DevModeContext);
  return devMode;
};
