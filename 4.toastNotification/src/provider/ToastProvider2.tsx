import { createContext, useState } from "react";

function contextProvider() {
  const [dummyState, setDummyState] = useState("");
  type contextType = {
    dummyState: string;
  };
  export const contextValue = createContext<contextType | undefined>(undefined);
  return <contextValue.Provider value={dummyState}></contextValue.Provider>;
}
