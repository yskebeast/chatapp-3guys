import React, { ChangeEvent, VFC } from "react";

import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import ListItemText from "@mui/material/ListItemText";
import { PostModalProps } from "../../types/type";

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

const avatarStyle = {
  width: 56,
  height: 56,
  marginRight: 2,
};

export const PostModal: VFC<PostModalProps> = (props) => {
  const { handleReply, reply, setReply, board, open, handleClose } = props;

  return (
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
          <Avatar sx={avatarStyle}></Avatar>
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
              <ListItemText style={{ listStyle: "none" }}>
                {board.tweet}
              </ListItemText>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            marginTop: 3,
            padding: 3,
            backgroundColor: "#fff",
          }}
        >
          <Avatar sx={avatarStyle}></Avatar>
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
  );
};
