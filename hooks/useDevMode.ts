import { createContext, useContext } from "react";

export const DevModeContext = createContext({
  isDevMode: false,
  setDevMode: (isDevMode: boolean) => {},
});

export const useDevMode = () => {
  const devMode = useContext(DevModeContext);
  return devMode;
};
