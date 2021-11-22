import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useHistory } from "react-router";
import { auth } from "../firebase";
import { onAuthStateChanged } from "@firebase/auth";

const AuthUserContext = createContext({});

export const useAuthUserContext = () => {
  return useContext(AuthUserContext);
};

export const AuthUserProvider = (props: { children: ReactNode }) => {
  const { children } = props;

  const history = useHistory();

  const [user, setUser] = useState<any>({});

  useEffect(() => {
    const unsubscribed = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (user) {
        history.push(`/home/${auth.currentUser?.uid}`);
      } else {
        history.push("/");
      }
    });
    return () => {
      unsubscribed();
    };
  }, [history]);

  return (
    <AuthUserContext.Provider value={user}>{children}</AuthUserContext.Provider>
  );
};

