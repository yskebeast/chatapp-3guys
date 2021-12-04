import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, deleteDoc, doc } from "@firebase/firestore";
import { query, orderBy, onSnapshot } from "firebase/firestore";

import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";

import { BoardPostModal } from "./BoardPostModal";
import { BoardReplyPost } from "./BoardReplyPost";
import { BoardAllPosts } from "./BoardAllPosts";
import { Arrtype, BoardPostType } from "../../types/type";



export const BoardPost = (props: BoardPostType) => {
  const { post, setLoad } = props;

  const [sideButton, setSideButton] = useState(true);
  const [replyPosts, setReplyPosts] = useState<Array<Arrtype>>([]);
  // expandはreduxにstoreしても良いかも
  const [expand, setExpand] = useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const formatTime: any = `${post.time.getFullYear()}/${
    post.time.getMonth() + 1
  }/${post.time.getDate()} ${post.time.getHours()}:${post.time.getMinutes()}`;

  useEffect(() => {
    const subCollection = collection(db, "board", post.id, "reply");
    const q = query(subCollection, orderBy("time", "desc"));
    onSnapshot(q, (querySnapshot) => {
      const arr: Arrtype[] = [];
      querySnapshot.forEach((doc) => {
        arr.push({
          name: doc.data().name,
          post: doc.data().post,
          id: doc.id,
          time: doc.data({ serverTimestamps: "estimate" }).time.toDate(),
        });
      });
      setReplyPosts(arr);
    });
  }, []);

  // useEffect(() => {
  //   let arr: Arrtype[] = [];
  //   const getPost = async () => {
  //     const querySnapshot = await getDocs(
  //       collection(db, "board", post.id, "reply")
  //       );
  //       querySnapshot.forEach((doc) => {
  //         arr.push({
  //           name: doc.data().name,
  //         post: doc.data().post,
  //         id: doc.id,
  //         time: doc.data({ serverTimestamps: "estimate" }).time.toDate(),
  //       });
  //     });
  //     setReplyPosts(arr);
  //     setGet(false)
  //   };
  //   getPost();
  // }, [get]);
  // console.log(replyPosts)

  const handleExpand: () => void = () => {
    expand ? setExpand(false) : setExpand(true);
  };

  const handleDelete: () => void = async () => {
    sideButton ? setSideButton(false) : setSideButton(true);
    if (!sideButton) {
      const deleteBtn = window.confirm("削除しても良いですか");
      if (deleteBtn) {
        await deleteDoc(doc(db, "board", post.id));
        setSideButton(true);
        setLoad(!false);
      }
    }
  };

  return (
    <Box sx={{ borderBottom: 1 }}>
      <Box sx={{ display: "flex", paddingY: 3 }}>
        <Avatar sx={{ width: 56, height: 56, marginRight: 2 }}></Avatar>
        <Box sx={{ width: "100%" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: "flex" }}>
              <p style={{ marginRight: 10 }}>{post.name}</p>
              <p>{formatTime}</p>
            </Box>
            <Box>
              <Button onClick={handleDelete}>
                {sideButton ? <span>・・・</span> : <span>削除</span>}
              </Button>
            </Box>
          </Box>
          <Box>
            <li style={{ whiteSpace: "pre-line" }}>{post.post}</li>
            <p>{post.id}</p>
          </Box>

          {/* 2択 */}
          {expand && (
            <ul style={{ listStyle: "none", paddingLeft: 0 }}>
              {replyPosts.map((replypost, index) => {
                return (
                  <Box key={index}>
                    <BoardReplyPost replypost={replypost} postId={post.id} setExpand={setExpand} />
                  </Box>
                );
              })}
            </ul>
          )}
          <Box sx={{ marginTop: 1 }}>
            <Button onClick={handleOpen} sx={{ marginRight: 3 }}>
              <ChatBubbleOutlineIcon />
              <span style={{ marginLeft: 5 }}>{replyPosts.length}</span>
            </Button>
            <Button onClick={handleExpand} disabled={replyPosts.length === 0}>
              {expand ? <span>閉じる</span> : <span>スレッドを見る</span>}
            </Button>
          </Box>
        </Box>
      </Box>

      {/* 2択 */}
      {/* {expand && (
        <ul style={{ listStyle: "none" }}>
          {replyPosts.map((replypost, index) => {
            return (
              <Box key={index}>
                <BoardReplyPost replypost={replypost} postId={post.id} />
              </Box>
            );
          })}
        </ul>
      )}
      <Box sx={{ marginTop: 1 }}>
        <Button onClick={handleOpen}>リプライボタン</Button>
        <Button onClick={handleExpand}>
          {expand ? <span>閉じる</span> : <span>開く</span>}
        </Button>
      </Box> */}

      {/* リプライモーダル */}
      <BoardPostModal
        formatTime={formatTime}
        open={open}
        handleClose={handleClose}
        post={post.post}
        name={post.name}
        id={post.id}
        setOpen={setOpen}
      />
      <BoardAllPosts />
    </Box>
  );
};
