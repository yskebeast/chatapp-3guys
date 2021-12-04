import React, { ChangeEvent, useState } from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { doc, updateDoc } from "@firebase/firestore";
import { db } from "../../firebase";
import { deleteDoc } from "firebase/firestore";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

type BoardReplyPostModalProps = {
  handleClose: () => void;
  open: boolean;
  replypostId: string;
  replypost: string;
  postId: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setExpand: React.Dispatch<React.SetStateAction<boolean>>;
};

export const BoardReplyPostModal = (props: BoardReplyPostModalProps) => {
  const {
    handleClose,
    open,
    replypostId,
    postId,
    setOpen,
    replypost,
    setExpand,
  } = props;

  const [replyPost, setReplyPost] = useState<string>(replypost);

  const handleReplyUpdate = async () => {
    const replyRef = doc(db, "board", postId, "reply", replypostId);
    await updateDoc(replyRef, {
      post: replyPost,
    });
    setOpen(false);
  };

  const handleReplyDelete = async () => {
    const deleteBtn = window.confirm("本当に削除しますか");
    if (deleteBtn) {
      await deleteDoc(doc(db, "board", postId, "reply", replypostId));
      setOpen(false);
      setExpand(false)
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Box sx={{ width: "100%", marginBottom: 2 }}>
          <TextField
            type="text"
            sx={{ width: "100%" }}
            value={replyPost}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setReplyPost(e.target.value)
            }
          />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button onClick={handleReplyUpdate}>編集</Button>
          <Button onClick={handleReplyDelete}>削除</Button>
        </Box>
      </Box>
    </Modal>
  );
};
