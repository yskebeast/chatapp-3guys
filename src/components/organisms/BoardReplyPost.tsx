import React from "react";

import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";

import { BoardReplyPostModal } from "./BoardReplyPostModal";
import { BoardReplyPostType } from "../../types/type";

export const BoardReplyPost = (props: BoardReplyPostType) => {
  const { replypost, postId, setExpand } = props;

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const formatTime: any = `${replypost.time.getFullYear()}/${
    replypost.time.getMonth() + 1
  }/${replypost.time.getDate()} ${replypost.time.getHours()}:${replypost.time.getMinutes()}`;

  return (
    <Box sx={{ display: "flex", paddingY: 3, borderBottom: 1 }}>
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
            <p style={{ marginRight: 10 }}>{replypost.name}</p>
            <p>{formatTime}</p>
          </Box>
          <Box>
            <Button onClick={handleOpen}>・・・</Button>
          </Box>
        </Box>
        <Box>
          <li>{replypost.post}</li>
          <p>{replypost.id}</p>
        </Box>
      </Box>

      {/* ボタンモーダル */}
      <BoardReplyPostModal
        handleClose={handleClose}
        open={open}
        replypostId={replypost.id}
        replypost={replypost.post}
        postId={postId}
        setOpen={setOpen}
        setExpand={setExpand}
      />
    </Box>
  );
};
