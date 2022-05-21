import { useState, useEffect } from "react";
import { supabaseClient } from "../pages/supabaseClient";

export const useIsSignedIn = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  supabaseClient.auth.onAuthStateChange((event, session) => {
    setIsSignedIn(!!session);
  });

  return isSignedIn;
};
