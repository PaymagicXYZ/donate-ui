import React from "react";
import { supabaseClient } from "../supabaseClient";

export const SupabaseContext = React.createContext(supabaseClient);

export const SupabaseProvider = (props) => {
  return (
    <SupabaseContext.Provider value={supabaseClient}>
      {props.children}
    </SupabaseContext.Provider>
  );
};
