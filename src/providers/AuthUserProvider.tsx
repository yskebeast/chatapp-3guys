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
import { db } from "../firebase"
import { doc, getDoc } from "firebase/firestore";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, login, logout } from "../features/userSlice";
import { store } from '../app/store';
import { Provider } from 'react-redux';


const AuthUserContext = createContext({});

export const useAuthUserContext = () => {
  return useContext(AuthUserContext);
};

export const AuthUserProvider = (props: { children: ReactNode }) => {
  const { children } = props;
  const dispatch = useDispatch();
  const history = useHistory();

  const getDocument = async(user:any) => {
    const docRef = doc(db, "users", user.uid);
    const docSnap =  await getDoc(docRef);
    if (docSnap.exists()) {
      dispatch(
        login({
          username: docSnap.data().name,
          uid: user.uid,
          selfIntro: docSnap.data().selfIntro,
        })
      )
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }

  useEffect(() => {
    const unsubscribed = onAuthStateChanged(auth, (user) => {
      if (user) {
        getDocument(user)

        history.push(`/home/${auth.currentUser?.uid}`);
      } else {
        dispatch(logout())
        history.push("/");
      }
    });
    return () => {
      unsubscribed();
    };
  }, [history]);

  return (
    <Provider store={store}>{children}</Provider>
  );
};

