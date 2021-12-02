import { memo, useEffect, useRef, useState, VFC } from "react";
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
} from "@firebase/firestore";

import { Post } from "../organisms/Post";
import "../../App.css";
import { MainPost } from "../molecules/MainPost";

import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";

type Arrprops = {
  id: string;
  tweet: string;
  name: string;
  uid: string;
  time: any;
};

export const Home: VFC = memo(() => {
  const history = useHistory();
  const loginUser = useSelector(selectUser);

  const [messages, setMessages] = useState<Array<any>>([]);

  useEffect(() => {
    const board = collection(db, "board");
    const q = query(board, orderBy("time", "desc"));
    onSnapshot(q, (querySnapshot) => {
      const arr: Array<Arrprops> = [];
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

  return (
    <Container maxWidth="md" sx={{ bgcolor: "#f8f8ff", height: "100%" }}>
      <CssBaseline />
      <Box
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <h3>{loginUser.username}</h3>
        <button onClick={handleIntro}>自己紹介</button>
        <button onClick={handleLogout}>ログアウト</button>
      </Box>
      <Box sx={{ width: "100%", marginBottom: 1, paddingBottom: 1 }}>
        <Typography variant="h5" sx={{ fontWeight: "bold", marginBottom: 1 }}>
          Home
        </Typography>
      </Box>
      <MainPost />
      <Box sx={{ width: "100%" }}>
        <List style={{ listStyle: "none", paddingLeft: 0 }}>
          {messages.map((message, index) => {
            return <Post key={index} board={message} />;
          })}
        </List>
      </Box>
    </Container>
  );
});
