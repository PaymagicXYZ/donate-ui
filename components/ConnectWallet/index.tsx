import { useEthers } from "@usedapp/core";
import Button from "../Button";

export default function ConnectWallet() {
  const { activateBrowserWallet } = useEthers();
  return (
    <Button onClick={activateBrowserWallet} borderRadius="accountBtn">
      Connect Wallet
    </Button>
  );
}
