import { memo, useState, VFC } from "react";
import { useHistory } from "react-router";
import { auth, db } from "../../firebase";
import { signOut } from "@firebase/auth";

import { useAuthUserContext } from "../../providers/AuthUserProvider";
import { collection, getDocs, query } from "@firebase/firestore";

export const Home: VFC = memo(() => {
  const history = useHistory();

  const [data, setData] = useState({});

  const uid = auth.currentUser?.uid;
  // console.log(uid);

  const user = useAuthUserContext();
  // console.log(user);

  const handleLogout = () => {
    signOut(auth).then(() => {
      history.push("/");
    });
  };

  const get = async () => {
    const q = query(collection(db, "users"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setData(doc.data());
    });
  };

  return (
    <div>
      <h1>メイン画面{auth.currentUser?.uid}</h1>
      <button onClick={handleLogout}>ログアウト</button>
      <button onClick={get}>get data</button>
    </div>
  );
});
