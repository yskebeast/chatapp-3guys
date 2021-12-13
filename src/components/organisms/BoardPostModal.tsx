import React, { ChangeEvent, useState } from "react";
import { addDoc, collection, serverTimestamp } from "@firebase/firestore";
import { db } from "../../firebase";
import { useSelector } from "react-redux";

import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";

import { selectUser } from "../../features/userSlice";
import { BoardPostModalType } from "../../types/type";

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

export const BoardPostModal = (props: BoardPostModalType) => {
   const { open, handleClose, formatTime, setOpen, name, post, id, image } =
      props;

   const loginUser = useSelector(selectUser);

   const [replyPost, setReplyPost] = useState<string>("");

   // サブコレクションに保存
   const handleReply = async () => {
      if (replyPost === "") return;
      const timestamp = serverTimestamp();
      await addDoc(collection(db, "board", id, "reply"), {
         post: replyPost,
         time: timestamp,
         name: loginUser.username,
      });
      setReplyPost("");
      setOpen(false);
   };

   return (
      <Modal
         open={open}
         onClose={handleClose}
         aria-labelledby="modal-modal-title"
         aria-describedby="modal-modal-description"
      >
         <Box sx={style}>
            {/* 投稿主 */}
            <Box
               sx={{
                  display: "flex",
                  paddingY: 3,
                  paddingLeft: 2,
                  marginBottom: 3,
               }}
            >
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
                        <p style={{ marginRight: 10 }}>{name}</p>
                        <p>{formatTime}</p>
                     </Box>
                  </Box>
                  <Box>
                     <li
                        style={{
                           listStyle: "none",
                           whiteSpace: "pre-line",
                        }}
                     >
                        {post}
                     </li>
                     <img
                        src={image}
                        style={{
                           width: "400px",
                           objectFit: "contain",
                           marginTop: 15,
                        }}
                        alt=""
                     />
                  </Box>
               </Box>
            </Box>

            {/* リプライ主 */}
            <Box sx={{ display: "flex", paddingY: 3, paddingLeft: 2 }}>
               <Avatar sx={{ width: 56, height: 56, marginRight: 2 }}></Avatar>
               <TextField
                  autoFocus
                  type="text"
                  id="standard-multiline-flexible"
                  multiline
                  sx={{ width: "100%" }}
                  value={replyPost}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                     setReplyPost(e.target.value)
                  }
               />
            </Box>

            {/* リプライ主ボタン */}
            <Box>
               <Button
                  sx={{ display: "flex", marginLeft: "auto" }}
                  onClick={handleReply}
                  disabled={replyPost.length === 0}
               >
                  リプライ
               </Button>
            </Box>
         </Box>
      </Modal>
   );
};
