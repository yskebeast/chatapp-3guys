import { ChangeEvent, memo, useEffect, useState, VFC } from "react";
import { useHistory } from "react-router";
import { auth, db } from "../../firebase";
import { signOut } from "@firebase/auth";

import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "@firebase/firestore";

import { Post } from "../organisms/Post";
import "../../App.css";

export const Home: VFC = memo(() => {
  const history = useHistory();
  const loginUser = useSelector(selectUser);

  const [messages, setMessages] = useState<Array<any>>([]);
  const [tweet, setTweet] = useState("");

  useEffect(() => {
      const board = collection(db, "board");
      const q = query(board, orderBy("time", "desc"));
      onSnapshot(q, (querySnapshot) => {
        const arr: Array<any> = [];
        querySnapshot.forEach((doc) => {
          arr.push({
            id: doc.id,
            tweet: doc.data().tweet,
            name: doc.data().name,
            uid: doc.data().user,
          });
        });
        setMessages(arr);
      });
  }, []);

  const handleLogout = () => {
    signOut(auth).then(() => {
      history.push("/");
    });
  };

  const handleIntro = () => {
    history.push(`/selfintro/${auth.currentUser?.uid}`);
  };

  const handleTweet = async () => {
    if (tweet === "") return;
    const timestamp = serverTimestamp();
    const ref = collection(db, "board");
    await addDoc(ref, {
      tweet: tweet,
      time: timestamp,
      user: loginUser.uid,
      name: loginUser.username,
    });
    setTweet("");
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <button onClick={handleIntro}>自己紹介</button>
        <button onClick={handleLogout}>ログアウト</button>
      </div>
      <h3>{loginUser.username}</h3>
      <div style={{ width: "400px", margin: "0 auto" }}>
        <div
          style={{
            marginBottom: "1rem",
            paddingBottom: "1rem",
            borderBottom: "1px solid black",
          }}
        >
          <input
            style={{ width: "100%", height: "60px" }}
            type="text"
            value={tweet}
            placeholder="調子はどう？"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setTweet(e.target.value)
            }
          />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <button>画像</button>
          <button onClick={handleTweet}>追加</button>
        </div>
      </div>
      <div style={{ width: "500px", margin: "0 auto" }}>
        <ul style={{ listStyle: "none" }}>
          {messages.map((message, index) => {
            return <Post key={index} message={message} />;
          })}
        </ul>
      </div>
    </div>
  );
});
