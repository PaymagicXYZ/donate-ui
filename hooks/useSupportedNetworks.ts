import { useState, useEffect } from "react";
import { useConfig } from "./useConfig";
import { TEST_NETWORKS, PROD_NETWORKS, NetworkData } from "../utils/constants";

export const useSupportedNetworks = () => {
  const { isDevMode } = useConfig();
  const [supportedNetworks, setSupportedNetworks] =
    useState<NetworkData>(PROD_NETWORKS);

  useEffect(() => {
    setSupportedNetworks(isDevMode ? TEST_NETWORKS : PROD_NETWORKS);
    // setSupportedNetworks(TEST_NETWORKS);
  }, [isDevMode]);

  return supportedNetworks;
};
