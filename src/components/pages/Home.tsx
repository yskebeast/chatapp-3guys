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
import { MainPost } from "../organisms/MainPost";

import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import { ArrProps } from "../../types/type";

export const Home: VFC = memo(() => {
  const history = useHistory();
  const loginUser = useSelector(selectUser);

  const [messages, setMessages] = useState<Array<any>>([]);

  useEffect(() => {
    const board = collection(db, "board");
    const q = query(board, orderBy("time", "desc"));
    onSnapshot(q, (querySnapshot) => {
      const arr: Array<ArrProps> = [];
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

  return (
    <Container maxWidth="md" sx={{ bgcolor: "#f8f8ff", height: "100%" }}>
      <CssBaseline />
      <Box
        sx={{
          width: "100%",
          paddingY: 3,
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: "bold", marginBottom: 1 }}>
          Home
        </Typography>
        <Typography variant="h5" sx={{ fontWeight: "bold", marginBottom: 1 }}>
          {loginUser.username}
          <span style={{ marginLeft: ".5rem" }}>さん</span>
        </Typography>
        <button onClick={handleLogout}>ログアウト</button>
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
