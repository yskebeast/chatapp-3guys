import { deleteDoc, doc, updateDoc } from "@firebase/firestore";
import React, { ChangeEvent, useEffect, useState, VFC } from "react";
import { db } from "../../firebase";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import ListItemText from '@mui/material/ListItemText';

type Props = {
  message: {
    name: string;
    tweet: string;
    id: string;
    time: any;
  };
  boardId: string;
};

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

export const ReplyPost: VFC<Props> = (props) => {
  const { message, boardId } = props;

  const [count, setCount] = useState(0);
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
    }
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          borderTop: 1,
          paddingY: 3,
        }}
      >
        <Avatar sx={{ width: 56, height: 56, marginRight: 2 }}></Avatar>
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
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Button onClick={() => setEdit(!edit)}>編集</Button>
            {edit && (
              <Box style={{ display: "flex", flexDirection: "column" }}>
                <TextField
                  type="text"
                  value={changeEdit}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setChangeEdit(e.target.value)
                  }
                />
                <Button onClick={handleReplyUpdate}>更新</Button>
              </Box>
            )}
          </Box>
          <Button
            sx={{ marginLeft: "auto", display: "block" }}
            onClick={handleReplyDelete}
          >
            削除
          </Button>
        </Box>
      </Modal>
      {/* <button onClick={() => setCount(count + 1)}>{count}</button> */}
    </Box>
  );
};
