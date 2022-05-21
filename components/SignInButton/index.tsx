import { useState, useContext } from "react";
import { SupabaseContext } from "../../lib/SupabaseProvider";
import { SiweMessage } from "siwe";
import axios from "axios";
import { Spinner } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import ConnectWallet from "../../components/ConnectWallet";

import { useEthers } from "@usedapp/core";

const SignInButton = () => {
  const [loading, setLoading] = useState(false);
  const { account, chainId, library } = useEthers();
  const supabase = useContext(SupabaseContext);

  const handleSignIn = async () => {
    if (account) {
      setLoading(true);
      const { data: nonce } = await axios.get("/api/auth/nonce");
      const messageData = new SiweMessage({
        domain: window.location.host,
        uri: window.location.origin,
        address: account,
        statement: "Sign in with Ethereum to EthGives",
        version: "1",
        chainId,
        nonce,
      });
      const message = messageData.prepareMessage();
      const signer = library.getSigner();
      const signature = await signer.signMessage(message);
      const { data } = await axios.post("/api/auth/verify", {
        message: message,
        signature,
      });
      await supabase.auth.setAuth(data.token);
      setLoading(false);
    }
  };

  return account ? (
    <Button my={10} onClick={handleSignIn}>
      {loading ? <Spinner /> : "Sign In With Ethereum"}
    </Button>
  ) : (
    <ConnectWallet my={10} />
  );
};

export default SignInButton;
