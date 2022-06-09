import { useState, useEffect } from "react";
import { useDevMode } from "./useDevMode";
import { TEST_NETWORKS, PROD_NETWORKS, NetworkData } from "../utils/constants";

export const useSupportedNetworks = () => {
  const { isDevMode } = useDevMode();
  const [supportedNetworks, setSupportedNetworks] =
    useState<NetworkData>(PROD_NETWORKS);

  useEffect(() => {
    console.log("CHAING");
    setSupportedNetworks(isDevMode ? TEST_NETWORKS : PROD_NETWORKS);
  }, [isDevMode]);

  return supportedNetworks;
};
