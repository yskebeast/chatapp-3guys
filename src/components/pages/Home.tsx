import { memo, VFC } from "react";
import { useHistory } from "react-router";
import { auth } from "../../firebase";
import { signOut } from "@firebase/auth";


import { useAuthUserContext } from "../../providers/AuthUserProvider";
import { collection, getDocs, query } from "@firebase/firestore";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, login, logout } from "../../features/userSlice";
import Header from "../organisms/Header";

export const Home: VFC = memo(() => {
  const history = useHistory();
  const loginUser = useSelector(selectUser);

  const handleLogout = () => {
    signOut(auth).then(() => {
      history.push("/");
    });
  };

  const handleIntro = () => {
    history.push(`/selfintro/${auth.currentUser?.uid}`);
  };

  return (
    <div>
      <Header />
      <h1>メイン画面</h1>
      <p>ユーザーID:{loginUser.uid}</p>
      <p>ユーザーネーム：{loginUser.username}</p>
      <p>自己紹介：{loginUser.selfIntro}</p>
      <button onClick={handleLogout}>ログアウト</button>
      <div>
        <button onClick={handleIntro}>自己紹介</button>
      </div>
    </div>
  );
});
