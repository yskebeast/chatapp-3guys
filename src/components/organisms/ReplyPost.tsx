import { deleteDoc, doc, updateDoc } from "@firebase/firestore";
import React, { useState, VFC } from "react";
import { db } from "../../firebase";

import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import ListItemText from "@mui/material/ListItemText";
import { ReplyPostModal } from "./ReplyPostModal";
import { ReplyPostProps } from "../../types/type";

export const ReplyPost: VFC<ReplyPostProps> = (props) => {
  const { message, boardId } = props;

  const [expand, setExpand] = useState(false);
  const [edit, setEdit] = useState(false);
  const [changeEdit, setChangeEdit] = useState<string>(message.tweet);
  const [open, setOpen] = React.useState(false);

  const formatTime: any = `${message.time.getFullYear()}/${
    message.time.getMonth() + 1
  }/${message.time.getDate()} ${message.time.getHours()}:${message.time.getMinutes()}`;

  const handleExpand = () => {
    setExpand(!expand);
    setOpen(true);
  };

  const handleReplyUpdate = async () => {
    const replyRef = doc(db, "board", boardId, "reply", message.id);
    await updateDoc(replyRef, {
      tweet: changeEdit,
    });
    setEdit(!edit);
    setOpen(false);
  };

  const handleReplyDelete = async () => {
    const deleteBtn = window.confirm("本当に削除しますか");
    if (deleteBtn) {
      await deleteDoc(doc(db, "board", boardId, "reply", message.id));
      setExpand(false);
      setOpen(false);
    }
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          borderTop: 1,
          paddingY: 3,
          bgcolor: "#fff",
        }}
      >
        <Box sx={{ paddingLeft: 2 }}>
          <Avatar sx={{ width: 56, height: 56, marginRight: 2 }}></Avatar>
        </Box>
        <Box style={{ width: "100%" }}>
          <Box
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box style={{ display: "flex" }}>
              <p
                style={{ fontWeight: "bold", color: "black", marginRight: 20 }}
              >
                {message.name}
              </p>
              <p>{formatTime}</p>
            </Box>
            <Button onClick={handleExpand}> ・・・</Button>
          </Box>
          <ListItemText>{message.tweet}</ListItemText>
        </Box>
      </Box>
      <ReplyPostModal
        open={open}
        setOpen={setOpen}
        edit={edit}
        setEdit={setEdit}
        changeEdit={changeEdit}
        setChangeEdit={setChangeEdit}
        handleReplyUpdate={handleReplyUpdate}
        handleReplyDelete={handleReplyDelete}
      />
    </Box>
  );
};
