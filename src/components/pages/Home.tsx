import { memo, VFC } from "react";
import { useHistory } from "react-router";
import { auth } from "../../firebase";
import { signOut } from "@firebase/auth";

import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";

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
