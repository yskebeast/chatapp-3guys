import React, { ChangeEvent, VFC } from "react";

import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { ReplyPostModalProps } from "../../types/type";

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

export const ReplyPostModal:VFC<ReplyPostModalProps> = (props) => {
  const {
    open,
    setOpen,
    edit,
    setEdit,
    changeEdit,
    setChangeEdit,
    handleReplyUpdate,
    handleReplyDelete,
  } = props;

  return (
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
                sx={{ marginY: 2 }}
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
  );
};
