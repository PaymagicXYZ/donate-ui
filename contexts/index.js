import { createContext } from "react";

export const AddressesContext = createContext({
  addresses: [],
  setAddresses: () => {},
});
