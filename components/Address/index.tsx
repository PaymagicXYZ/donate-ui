import { useEffect, useState } from "react";
import { useEthers } from "@usedapp/core";
import { BLOCK_EXPLORERS } from "../../utils/constants";
import { shortenAddress } from "../../utils";
import { Text, Link, TextProps } from "@chakra-ui/react";

interface Props extends TextProps {
  address: string;
  chainId?: number;
}

const Address = (props: Props) => {
  const { address, chainId, ...textProps } = props;
  const { chainId: currentChainId } = useEthers();
  const blockExplorerLink = BLOCK_EXPLORERS[chainId || currentChainId];
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

  return (
    <Text
      fontWeight={700}
      opacity={0.9}
      color="text"
      {...textProps}
      thing="hey"
    >
      <Link
        isExternal
        href={`${blockExplorerLink}/address/${props.address}`}
        _hover={{
          textDecoration: "none",
        }}
        _focus={{ boxShadow: "none" }}
      >
        {ensName || shortenAddress(props.address || "")}
      </Link>
    </Text>
  );
};

export default Address;
