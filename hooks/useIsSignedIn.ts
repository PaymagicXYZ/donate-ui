import { useEthers } from "@usedapp/core";
import { useState, useContext, useEffect } from "react";
import { SupabaseContext } from "../lib/SupabaseProvider";
import { supabaseClient } from "../supabaseClient";
import axios from "axios";
import { SiweMessage } from "siwe";

export const useIsSignedIn = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  supabaseClient.auth.onAuthStateChange((event, session) => {
    setIsSignedIn(!!session);
  });

  return isSignedIn;
};

export const useSignIn = () => {
  const [loading, setLoading] = useState(false);
  const { account, chainId, library } = useEthers();
  const supabase = useContext(SupabaseContext);

  const signIn = async () => {
    if (account) {
      setLoading(true);
      const { data: nonce } = await axios.get("/api/auth/nonce");
      const messageData = new SiweMessage({
        domain: window.location.host,
        uri: window.location.origin,
        address: account,
        statement: "Sign this message to publish your page with EthGives",
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

  return {
    loading,
    signIn,
  };
};
