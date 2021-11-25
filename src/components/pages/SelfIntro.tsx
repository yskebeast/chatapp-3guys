import { Button, createTheme, TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import Modal from "@mui/material/Modal";
import React, { ChangeEvent, memo, VFC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAppDispatch } from "../../app/hooks";
import { changeName, selectUser } from "../../features/userSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const SelfIntro: VFC = memo(() => {
  const loginUser = useSelector(selectUser);
  const dispach = useAppDispatch();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box sx={{ width: "60%", marginX: "auto", textAlign: "center" }}>
      <h1>プロフィール</h1>
      <div>
        <img
          style={{ width: "150px", height: "150px", background: "white" }}
          src=""
          alt=""
        />
      </div>
      <Button onClick={handleOpen}>編集</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "white",
            border: "px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            プロフィールを編集
          </Typography>
          <Box sx={{ my: 3 }}>
            <Typography component="p" style={{ textAlign: "left" }}>
              名前
            </Typography>
            <TextField
              sx={{ width: "100%", marginTop: 1 }}
              type="text"
              value={loginUser.username}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                dispach(changeName(e.target.value))
              }
            />
          </Box>
          <Box>
            <Typography component="p" style={{ textAlign: "left" }}>
              自己紹介
            </Typography>
            <TextField
              sx={{ width: "100%", marginTop: 1 }}
              type="text"
              value={loginUser.selfIntro}
              // onChange={(e: ChangeEvent<HTMLInputElement>) =>
              //   dispach(loginUser.selfIntro(e.target.value))
              // }
            />
          </Box>
          <Box sx={{ my: 3 }}>
            <Typography component="p" style={{ textAlign: "left" }}>
              生年月日
            </Typography>
            <TextField
              sx={{ width: "100%", marginTop: 1 }}
              type="text"
              value="1999年11月11日"
              // onChange={(e: ChangeEvent<HTMLInputElement>) =>
              //   dispach(loginUser.selfIntro(e.target.value))
              // }
            />
          </Box>
        </Box>
      </Modal>
      <div>
        <p style={{ textAlign: "left" }}>名前</p>
        <TextField
          sx={{ width: "100%" }}
          type="text"
          value={loginUser.username}
          id="outlined-read-only-input"
          InputProps={{
            readOnly: true,
          }}
        />
      </div>
      <div>
        <p style={{ textAlign: "left" }}>自己紹介</p>
        <TextField
          sx={{ width: "100%" }}
          type="text"
          value={loginUser.selfIntro}
          id="outlined-read-only-input"
          InputProps={{
            readOnly: true,
          }}
        />
      </div>
      <div>
        <p style={{ textAlign: "left" }}>生年月日</p>
        <TextField
          sx={{ width: "100%" }}
          type="text"
          value="1999年11月11日"
          id="outlined-read-only-input"
          InputProps={{
            readOnly: true,
          }}
        />
      </div>
    </Box>
  );
});
