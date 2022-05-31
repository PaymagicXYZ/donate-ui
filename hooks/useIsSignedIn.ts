import { useState } from "react";
import { supabaseClient } from "../supabaseClient";

export const useIsSignedIn = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  supabaseClient.auth.onAuthStateChange((event, session) => {
    setIsSignedIn(!!session);
  });

  return isSignedIn;
};
