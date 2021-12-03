import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "@firebase/firestore";
import React, { useEffect, useState, VFC } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import { db } from "../../firebase";
import { ReplyPost } from "./ReplyPost";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "../../App.css";
import ListItemText from "@mui/material/ListItemText";
import { PostModal } from "./PostModal";
import { PostProps } from "../../types/type";
import { useBoard } from "../../hooks/useBoard";

export const Post: VFC<PostProps> = (props) => {
  const { board } = props;

  const loginUser = useSelector(selectUser);

  const { valid, setValid } = useBoard();

  const [both, setBoth] = useState(false);
  const [expand, setExpand] = useState(false);
  const [reply, setReply] = useState<string>("");
  const [messages, setMessages] = useState<Array<any>>([]);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const match = board.uid === loginUser.uid;

  const formatTime: any = `${board.time.getFullYear()}/${
    board.time.getMonth() + 1
  }/${board.time.getDate()} ${board.time.getHours()}:${board.time.getMinutes()}`;

  useEffect(() => {
    const subCollection = collection(db, "board", board.id, "reply");
    const q = query(subCollection, orderBy("time", "desc"));
    onSnapshot(q, (querySnapshot) => {
      const arr: Array<any> = [];
      querySnapshot.forEach((doc) => {
        arr.push({
          name: doc.data().name,
          tweet: doc.data().tweet,
          id: doc.id,
          time: doc.data({ serverTimestamps: "estimate" }).time.toDate(),
        });
      });
      setMessages(arr);
    });
  }, []);

  const handleReply = async () => {
    if (reply === "") return;
    const timestamp = serverTimestamp();
    await addDoc(collection(db, "board", board.id, "reply"), {
      tweet: reply,
      time: timestamp,
      name: loginUser.username,
    });
    setReply("");
    setOpen(false);
    setBoth(true);
  };

  const handleDelete = async () => {
    const deleteBtn = window.confirm("削除しても良いですか");
    if (deleteBtn) {
      await deleteDoc(doc(db, "board", board.id));
      setExpand(false);
    }
  };

  useEffect(() => {
    setValid(false);
  }, [messages]);

  return (
    <Container sx={{ width: "100%" }}>
      <Box sx={{ display: "flex", borderTop: 1, paddingY: 3 }}>
        <Avatar sx={{ width: 56, height: 56, marginRight: 2 }}></Avatar>
        <Box sx={{ width: "100%" }}>
          <Box
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: "flex" }}>
              <p
                className="red"
                style={{ fontWeight: "bold", marginRight: "1rem" }}
              >
                {board.name}
              </p>
              <p>{formatTime}</p>
            </Box>
            {match && (
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Button onClick={() => setExpand(!expand)}>
                  {expand && <Button onClick={handleDelete}>削除</Button>}
                  ・・・
                </Button>
              </Box>
            )}
          </Box>
          <Box style={{ marginBottom: "20px" }}>
            <ListItemText>{board.tweet}</ListItemText>
          </Box>
        </Box>
      </Box>

      {both && (
        <Box>
          <ul style={{ listStyle: "none", paddingLeft: "0" }}>
            {messages.map((message, index) => {
              return (
                <ReplyPost key={index} message={message} boardId={board.id} />
              );
            })}
          </ul>
        </Box>
      )}

      <Box sx={{ marginTop: 2 }}>
        <Button onClick={handleOpen}>返信</Button>
        <Button onClick={() => setBoth(!both)}>
          {both ? <span>閉じる</span> : <span>開く</span>}
        </Button>
      </Box>
      <PostModal
        handleReply={handleReply}
        reply={reply}
        setReply={setReply}
        board={board}
        open={open}
        handleClose={handleClose}
      />
    </Container>
  );
};
