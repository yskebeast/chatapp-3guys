import { Avatar, Button, TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import Modal from "@mui/material/Modal";
import React, { ChangeEvent, memo, useState, VFC } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../app/hooks";
import {
  changeBirth,
  changeName,
  changeSelfIntro,
  selectUser,
} from "../../features/userSlice";
import AddAPhotoRoundedIcon from "@mui/icons-material/AddAPhotoRounded";
import {
  collection,
  doc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase";

export const SelfIntro: VFC = memo(() => {
  const loginUser = useSelector(selectUser);
  const UserName = useSelector(selectUser).username;
  const UserId = useSelector(selectUser).uid;
  console.log("loginuserだよ  " + loginUser);
  console.log("userNameだよ  " + UserName);
  console.log(UserId);

  const dispach = useAppDispatch();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [Userid, setUserid] = useState(0);

  // console.log(doc(db, "users", useSelector(selectUser).uid));
  // console.log(doc(db, "users", UserId));

  const change = async () => {
    const ref = doc(db, "users", UserId);
    await updateDoc(ref, {
      name: "響き",
      // 変数名
    });
  };

  // const userRef = db.collection("users").doc("4eADonIyVHL8bdISoN5T");
  // const UserRef = doc(db, "users", UserId);

  // const EditName = async () => {
  //   await setDoc(UserRef, {
  //     name: "オバはるき", ここにテキストを代入
  //   });
  // };

  return (
    <Box sx={{ width: "60%", marginX: "auto", textAlign: "center" }}>
      <button onClick={change}>cccc</button>
      <Typography
        component="h1"
        sx={{ fontSize: "30px", my: 3, fontWeight: "bold" }}
      >
        プロフィール
      </Typography>
      <Box
        sx={{
          my: 5,
          display: "flex",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <Avatar
          src="/broken-image.jpg"
          style={{ width: "150px", height: "150px" }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            ml: 17,
          }}
        >
          <Button
            sx={{
              width: 20,
              borderRadius: "40%",
              height: 50,
            }}
            style={{ backgroundColor: "#f1f1f1" }}
          >
            <AddAPhotoRoundedIcon sx={{ color: "black", width: 20 }} />
          </Button>
        </Box>
      </Box>
      <Button
        sx={{ display: "block", marginLeft: "auto" }}
        onClick={handleOpen}
      >
        編集
      </Button>
      <Modal
        open={open}
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
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ textAlign: "center", fontWeight: "bold" }}
          >
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
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                dispach(changeSelfIntro(e.target.value))
              }
            />
          </Box>
          <Box sx={{ my: 3 }}>
            <Typography component="p" style={{ textAlign: "left" }}>
              生年月日
            </Typography>
            <TextField
              sx={{ width: "100%", marginTop: 1 }}
              type="text"
              value={loginUser.birth}
              onChange={
                (e: ChangeEvent<HTMLInputElement>) =>
                  console.log(e.target.value)
                // dispach(changeBirth(e.target.value))
                // console.log(e.targe.value)
              }
            />
          </Box>
          <Button
            sx={{ display: "block", marginLeft: "auto" }}
            onClick={handleClose}
          >
            保存
          </Button>
        </Box>
      </Modal>
      <Typography component="p" sx={{ textAlign: "left", mb: 1 }}>
        名前
      </Typography>
      <TextField
        sx={{ width: "100%", mb: 2 }}
        type="text"
        value={loginUser.username}
        id="outlined-read-only-input"
        InputProps={{
          readOnly: true,
        }}
      />
      <Typography component="p" sx={{ textAlign: "left", mb: 1 }}>
        自己紹介
      </Typography>
      <TextField
        sx={{ width: "100%", mb: 2 }}
        type="text"
        value={loginUser.selfIntro}
        id="outlined-read-only-input"
        InputProps={{
          readOnly: true,
        }}
      />
      <Typography component="p" sx={{ textAlign: "left", mb: 1 }}>
        生年月日
      </Typography>
      <TextField
        sx={{ width: "100%" }}
        type="text"
        value={loginUser.birth}
        id="outlined-read-only-input"
        InputProps={{
          readOnly: true,
        }}
      />
    </Box>
  );
});
