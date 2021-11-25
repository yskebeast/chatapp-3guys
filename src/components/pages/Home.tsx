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

import "../../App.css";

export const Home: VFC = memo(() => {
  const history = useHistory();
  const loginUser = useSelector(selectUser);

  const [messages, setMessages] = useState<Array<any>>([]);
  const [tweet, setTweet] = useState("");
  const [like, setLike] = useState<number>(0);
  const [close, setClose] = useState(false);

  useEffect(() => {
    const r = collection(db, "board");
    const q = query(r, orderBy("time", "desc"));
    onSnapshot(q, (querySnapshot) => {
      const arr: Array<any> = [];
      querySnapshot.forEach((doc) => {
        arr.push(doc.data().tweet);
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

  const handleLike = (index: any) => {};

  const handleSend = (index: any) => {
    setClose(!close);
  };

  const handleReply = async () => {

  };

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
        <h1>{loginUser.username}</h1>
        <button onClick={handleIntro}>自己紹介</button>
        <button onClick={handleLogout}>ログアウト</button>
      </div>
      <ul>
        {messages.map((message, index) => {
          return (
            <div key={index}>
              <li>{message}</li>
              {close && (
                <div>
                  <ul>
                    <li>リプライ</li>
                  </ul>
                  <div>
                    <input type="text" />
                    <button onClick={handleReply}>送信</button>
                  </div>
                </div>
              )}
              <button onClick={() => handleLike(index)}>いいね</button>
              <button onClick={() => handleSend(index)}>
                {close ? <p>閉じる</p> : <p>返信</p>}
              </button>
            </div>
          );
        })}
      </ul>
      <input
        type="text"
        value={tweet}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setTweet(e.target.value)
        }
      />
      <button onClick={handleTweet}>追加</button>
    </div>
  );
});
