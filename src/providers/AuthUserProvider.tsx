import { createContext, ReactNode, useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "@firebase/auth";

type ContextState = {
  user: string | null;
}

export const AuthUserContext = createContext({} as ContextState);

export const AuthUserProvider = (props: { children: ReactNode }) => {
  const { children } = props;

  const [user, setUser] = useState<any>("");

  useEffect(() => {
    const unsubscribed = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => {
      unsubscribed();
    };
  }, []);

  return (
    <AuthUserContext.Provider value={user}>{children}</AuthUserContext.Provider>
  );
};
