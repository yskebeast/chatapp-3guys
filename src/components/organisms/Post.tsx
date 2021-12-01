import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "@firebase/firestore";
import { ChangeEvent, useEffect, useState, VFC } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import { db } from "../../firebase";
import { ReplyPost } from "./ReplyPost";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

type Props = {
  board: {
    id: string;
    tweet: string;
    name: string;
    uid: string;
    time: any;
  };
};

export const Post: VFC<Props> = (props) => {
  const { board } = props;

  const loginUser = useSelector(selectUser);

  const [both, setBoth] = useState(false);
  const [expand, setExpand] = useState(false);
  const [edit, setEdit] = useState(false);
  const [like, setLike] = useState<number>(0);
  const [reply, setReply] = useState<string>("");
  const [changeEdit, setChangeEdit] = useState<string>(board.tweet);
  const [messages, setMessages] = useState<Array<any>>([]);

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

  // const handleUpdate = async () => {
  //   const boardRef = doc(db, "board", board.id);
  //   await updateDoc(boardRef, {
  //     tweet: changeEdit,
  //   });
  //   setEdit(!edit);
  // };

  const handleDelete = async () => {
    const deleteBtn = window.confirm("削除しても良いですか");
    if (deleteBtn) {
      await deleteDoc(doc(db, "board", board.id));
      setExpand(false);
    }
  };

  return (
    <Container sx={{ width: "100%" }}>
      <Box sx={{ display: "flex" }}>
        <Avatar sx={{ width: 56, height: 56, marginRight: 2 }}></Avatar>
        <Box>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <p style={{ fontWeight: "bold" }}>{board.name}</p>
            <p>{formatTime}</p>
            {match && (
              <div style={{ display: "flex", alignItems: "center" }}>
                <Button onClick={() => setExpand(!expand)}> ・・・</Button>
                {expand && (
                  <>
                    <div>
                      {/* <button onClick={() => setEdit(!edit)}>編集</button> */}
                      <Button onClick={handleDelete}>削除</Button>
                    </div>
                    {/* {edit && (
                    <div style={{ display: "flex", flexDirection: "column" }}>
                  <input
                      type="text"
                      value={changeEdit}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setChangeEdit(e.target.value)
                      }
                      />
                      <button onClick={handleUpdate}>更新</button>
                      </div>
                    )} */}
                  </>
                )}
              </div>
            )}
          </div>
          <div style={{ marginBottom: "20px" }}>
            <li>{board.tweet}</li>
          </div>
          {both && (
            <div>
              <ul style={{ listStyle: "none" }}>
                {messages.map((message, index) => {
                  return (
                    <ReplyPost
                      key={index}
                      message={message}
                      boardId={board.id}
                    />
                  );
                })}
              </ul>
              <div>
                <input
                  type="text"
                  value={reply}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setReply(e.target.value)
                  }
                />
                <button onClick={handleReply}>送信</button>
              </div>
            </div>
          )}
          <button onClick={() => setBoth(!both)}>
            {both ? <span>閉じる</span> : <span>開く</span>}
          </button>
          <button onClick={handleLike}>いいね{like}</button>
        </Box>
      </Box>
    </Container>
  );
};
