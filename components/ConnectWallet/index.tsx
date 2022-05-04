import { useEthers } from "@usedapp/core";
import { Button } from '@chakra-ui/react';


export default props => {
  const { activateBrowserWallet } = useEthers();
  return (
    <Button color="primary" {...props} onClick={activateBrowserWallet}>Connect Wallet</Button>
  )
}