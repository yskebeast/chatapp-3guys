import { ChangeEvent, memo, useEffect, useState, VFC } from "react";
import { useHistory } from "react-router";
import { auth, db } from "../../firebase";
import { signOut } from "@firebase/auth";

import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import {
  addDoc,
  collection,
  doc,
  getDoc,
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
    const r = collection(db, "board");
    const q = query(r, orderBy("time", "desc"));
    onSnapshot(q, (querySnapshot) => {
      const arr: Array<any> = [];
      querySnapshot.forEach((doc) => {
        arr.push({
          tweet: doc.data().tweet,
          name: doc.data().name,
          id: doc.id,
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

  const handleReply = async () => {};

  const handleTweet = async () => {
    const timestamp = serverTimestamp();
    const newMessages = [...messages, tweet];
    setMessages(newMessages);
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
        <h1>{loginUser.username}</h1>
      <div style={{ width: "400px", display: "flex", margin: "0 auto" }}>
        <input
          style={{ width: "300px" }}
          type="text"
          value={tweet}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setTweet(e.target.value)
          }
        />
        <button style={{ margin: "0, auto" }} onClick={handleTweet}>
          追加
        </button>
      </div>
      <div style={{ width: "500px", margin: "0 auto" }}>
        <ul style={{ listStyle: "none" }}>
          {messages.map((message, index) => {
            return <Post key={index} index={index} message={message} />;
          })}
        </ul>
      </div>
    </div>
  );
});
