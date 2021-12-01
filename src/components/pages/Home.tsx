import { memo, VFC } from "react";
import { useHistory } from "react-router";
import { auth, db } from "../../firebase";
import { signOut } from "@firebase/auth";

import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import { collection, onSnapshot, query } from "firebase/firestore";

export const Home: VFC = memo(() => {
  const get = () => {
    const q = query(collection(db, "board"));
    onSnapshot(q, (querySnapshot) => {
      const cities: any = []; //citiesを配列で宣言
      querySnapshot.forEach((doc) => {
        //この関数が値を取得する関数になっている。
        cities.push(doc.data());
        console.log("関数起動");
        console.log(doc.data());
        console.log("関数起動");
      });
      console.log("Current cities in CA: ", cities.join(", "));
    });
  };

  const buttonUser = () => {
    history.push("./userlist");
  };

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
      <button onClick={get}></button>
      <button onClick={buttonUser}>userlinkへのボタン</button>
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
