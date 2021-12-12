import React, { useEffect, useState } from "react";
import { db, storage } from "../../firebase";
import { collection, deleteDoc, doc } from "@firebase/firestore";
import { query, orderBy, onSnapshot } from "firebase/firestore";

import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";

import { BoardPostModal } from "./BoardPostModal";
import { BoardReplyPost } from "./BoardReplyPost";
import { ArrReplyType, BoardPostType } from "../../types/type";
import { getDownloadURL, ref } from "@firebase/storage";

const style = {
   position: "absolute" as "absolute",
   left: "50%",
   transform: "translateX(-50%)",
   width: "60%",
   height: "95%",
   bgcolor: "background.paper",
   border: "2px solid #000",
   boxShadow: 24,
   p: 4,
   overflow: "scroll",
   display: "block",
};

export const BoardPost = (props: BoardPostType) => {
   const { post, setLoad } = props;

   const [sideButton, setSideButton] = useState(true);
   const [replyPosts, setReplyPosts] = useState<Array<ArrReplyType>>([]);
   const [image, setImage] = useState<any>("");
   // expandはreduxにstoreしても良いかも
   const [expand, setExpand] = useState(false);
   const [open, setOpen] = React.useState(false);

   // 返信投稿入力画面
   const handleOpen = () => setOpen(true);
   const handleClose = () => setOpen(false);

   // リプライ一覧表示
   const [replyAllPost, setReplyAllPost] = React.useState(false);
   const handleReplyOpen = () => setReplyAllPost(true);
   const handleReplyClose = () => setReplyAllPost(false);

   const formatTime: any = `${post.time.getFullYear()}/${
      post.time.getMonth() + 1
   }/${post.time.getDate()} ${post.time.getHours()}:${post.time.getMinutes()}`;

   useEffect(() => {
      const subCollection = collection(db, "board", post.id, "reply");
      const q = query(subCollection, orderBy("time", "desc"));
      onSnapshot(q, (querySnapshot) => {
         const arr: ArrReplyType[] = [];
         querySnapshot.forEach((doc) => {
            arr.push({
               name: doc.data().name,
               post: doc.data().post,
               id: doc.id,
               time: doc.data({ serverTimestamps: "estimate" }).time.toDate(),
            });
         });
         setReplyPosts(arr);
         const starsRef = ref(storage, `/files/${post.image}`);
         getDownloadURL(starsRef)
            .then((url) => {
               setImage(url);
            })
            .catch((error) => {
               console.log(error.message);
            });
      });
   }, []);

   // const handleExpand: () => void = () => {
   //   expand ? setExpand(false) : setExpand(true);
   // };

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
                  <li
                     style={{
                        whiteSpace: "pre-line",
                        marginBottom: "1.5rem",
                     }}
                  >
                     {post.post}
                  </li>
                  {image && (
                     <img
                        src={image}
                        style={{ width: "300px", height: "350px" }}
                        alt=""
                     />
                  )}
               </Box>

               {/* リプライ一覧モーダル */}
               <Modal
                  open={replyAllPost}
                  onClose={handleReplyClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
               >
                  <Box sx={style}>
                     <Box sx={{ display: "flex", paddingY: 3 }}>
                        <Avatar
                           sx={{
                              width: 56,
                              height: 56,
                              marginRight: 2,
                           }}
                        ></Avatar>
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
                           </Box>
                           <Box>
                              <li
                                 style={{
                                    whiteSpace: "pre-line",
                                    marginBottom: "1.5rem",
                                    listStyle: "none",
                                 }}
                              >
                                 {post.post}
                              </li>
                              {image && (
                                 <img
                                    src={image}
                                    style={{
                                       width: "300px",
                                       height: "400px",
                                    }}
                                    alt=""
                                 />
                              )}
                           </Box>
                        </Box>
                     </Box>

                     <ul style={{ listStyle: "none", paddingLeft: 0 }}>
                        {replyPosts.map((replypost, index) => {
                           return (
                              // リプライ一覧モーダル投稿ごと
                              <Box key={index}>
                                 <BoardReplyPost
                                    replypost={replypost}
                                    postId={post.id}
                                    setExpand={setExpand}
                                 />
                              </Box>
                           );
                        })}
                     </ul>
                  </Box>
               </Modal>

               {/* リプライ＆スレッドを見るボタン */}
               <Box sx={{ marginTop: 1 }}>
                  <Button onClick={handleOpen} sx={{ marginRight: 3 }}>
                     <ChatBubbleOutlineIcon />
                     <span style={{ marginLeft: 5 }}>{replyPosts.length}</span>
                  </Button>
                  <Button
                     onClick={handleReplyOpen}
                     disabled={replyPosts.length === 0}
                  >
                     {/* {expand ? <span>閉じる</span> : <span>スレッドを見る</span>} */}
                     スレッドを見る
                  </Button>
               </Box>
            </Box>
         </Box>

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
      </Box>
   );
};
