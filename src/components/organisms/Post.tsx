import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "@firebase/firestore";
import React, { ChangeEvent, useEffect, useState, VFC } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import { db } from "../../firebase";
import { ReplyPost } from "./ReplyPost";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import "../../App.css";
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';


type Props = {
  board: {
    id: string;
    tweet: string;
    name: string;
    uid: string;
    time: any;
  };
};

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const Post: VFC<Props> = (props) => {
  const { board } = props;

  const loginUser = useSelector(selectUser);

  const [both, setBoth] = useState(false);
  const [expand, setExpand] = useState(false);
  const [like, setLike] = useState<number>(0);
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

  const handleLike = async () => {
    // setLike(like + 1);
    // if (like === 1) {
    //   setLike(like - 1);
    // }
    // const likeBtn = doc(db, "board", board.id);
    // await updateDoc(likeBtn, {
    //   like: like
    // });
  };

  const handleDelete = async () => {
    const deleteBtn = window.confirm("削除しても良いですか");
    if (deleteBtn) {
      await deleteDoc(doc(db, "board", board.id));
      setExpand(false);
    }
  };

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
          {both && (
            <Box>
              <List style={{ listStyle: "none", paddingLeft: "0" }}>
                {messages.map((message, index) => {
                  return (
                    <ReplyPost
                      key={index}
                      message={message}
                      boardId={board.id}
                    />
                  );
                })}
              </List>
            </Box>
          )}
          <Box sx={{ marginTop: 2 }}>
            <Button onClick={handleOpen}>返信</Button>
            <Button
              onClick={() => setBoth(!both)}
              disabled={ReplyPost.length === 0}
            >
              {both ? <span>閉じる</span> : <span>開く</span>}
            </Button>
          </Box>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Box
                sx={{
                  display: "flex",
                  backgroundColor: "#f8f8ff",
                  marginTop: 3,
                  padding: 3,
                }}
              >
                <Avatar sx={{ width: 56, height: 56, marginRight: 2 }}></Avatar>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                  }}
                >
                  <p style={{ fontWeight: "bold", marginRight: "1rem" }}>
                    {board.name}
                  </p>
                  <Box style={{ marginBottom: "20px" }}>
                    <ListItemText style={{ listStyle: "none" }}>{board.tweet}</ListItemText>
                  </Box>
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  marginTop: 3,
                  padding: 3,
                  backgroundColor: "#f8f8ff",
                }}
              >
                <Avatar sx={{ width: 56, height: 56, marginRight: 2 }}></Avatar>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <TextField
                      autoFocus
                      type="text"
                      id="standard-multiline-flexible"
                      multiline
                      value={reply}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setReply(e.target.value)
                      }
                    />
                    <Button
                      sx={{
                        display: "flex",
                        width: "10%",
                        marginLeft: "auto",
                        marginTop: 2,
                      }}
                      onClick={handleReply}
                    >
                      送信
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Modal>
          {/* <button onClick={handleLike}>いいね{like}</button> */}
        </Box>
      </Box>
    </Container>
  );
};
