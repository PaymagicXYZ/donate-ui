import { useEthers } from "@usedapp/core";
import { useEffect, useState } from "react";
import { shortenAddress } from "../../utils";

interface Props {
  address: string;
}

export default ({ address }: Props) => {
  const [ensName, setENSName] = useState<string>();
  const { library } = useEthers();

  const getENSname = async () => {
    try {
      const name = await library.lookupAddress(address);
      if (name) {
        setENSName(name);
      }
    } catch (error) {
      //It will send an error if the address is not registered on the ENS or the network is not supported
      console.log(error);
    }
  };

  useEffect(() => {
    if (address) getENSname();
  }, [address]);

  return ensName || shortenAddress(address);
};
