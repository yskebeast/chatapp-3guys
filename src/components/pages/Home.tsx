import { ChangeEvent, memo, useEffect, useRef, useState, VFC } from "react";
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
import { MainPost } from "../molecules/MainPost";

import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export const Home: VFC = memo(() => {
  const history = useHistory();
  const loginUser = useSelector(selectUser);

  // const inputRef = useRef<any>(null);
  const [messages, setMessages] = useState<Array<any>>([]);
  // const [tweet, setTweet] = useState("");

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
          time: doc.data({ serverTimestamps: "estimate" }).time.toDate(),
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

  // const handleTweet = async () => {
  //   if (tweet === "") return;
  //   const timestamp = serverTimestamp();
  //   const ref = collection(db, "board");
  //   await addDoc(ref, {
  //     tweet: tweet,
  //     time: timestamp,
  //     user: loginUser.uid,
  //     name: loginUser.username,
  //   });
  //   setTweet("");
  // };

  return (
    <Container maxWidth="md" sx={{ bgcolor: "#cfe8fc", height: "100vh" }}>
      <CssBaseline />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <h3>{loginUser.username}</h3>
        <button onClick={handleIntro}>自己紹介</button>
        <button onClick={handleLogout}>ログアウト</button>
      </div>
      <Box sx={{ width: "100%", marginBottom: 1, paddingBottom: 1 }}>
        <Typography variant="h5" sx={{ fontWeight: "bold", marginBottom: 1 }}>
          Home
        </Typography>
      </Box>
      {/* <div style={{ width: "400px", margin: "0 auto" }}>
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
          <div>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <button onClick={() => inputRef.current.click()}>画像</button>
          <input
            hidden
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              console.log(e.target.files);
            }}
          />
          <button onClick={handleTweet}>追加</button>
        </div>
      </div> */}
      <MainPost />
      <Box sx={{ width: "100%"}}>
        <ul style={{ listStyle: "none", paddingLeft:0 }}>
          {messages.map((message, index) => {
            return <Post key={index} board={message} />;
          })}
        </ul>
      </Box>
    </Container>
  );
});

