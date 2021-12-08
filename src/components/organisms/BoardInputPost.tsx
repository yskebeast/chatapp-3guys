import { ChangeEvent, useState } from "react";
import { db, storage } from "../../firebase";
import { addDoc, collection, serverTimestamp } from "@firebase/firestore";
import { useSelector } from "react-redux";

import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";

import { selectUser } from "../../features/userSlice";
import { InputPostType } from "../../types/type";
import { getDownloadURL, ref, uploadBytesResumable } from "@firebase/storage";

export const BoardInputPost = (props: InputPostType) => {
  const { setLoad } = props;
  const loginUser = useSelector(selectUser);

  const [post, setPost] = useState<string>("");

  // ドキュメントに保存
  const handlePost = async () => {
    if (post === "") return;
    const timestamp = serverTimestamp();
    const ref = collection(db, "board");
    await addDoc(ref, {
      post: post,
      time: timestamp,
      user: loginUser.uid,
      name: loginUser.username,
    });
    setPost("");
    setLoad(!false);
  };

  const [progress, setProgress] = useState(0);

  const handleImage = (e: any) => {
    e.preventDefault();
    const file = e.target[0].files[0];
    uploadFile(file)
  };

  const uploadFile = (file: any) => {
    if (!file) return;
    const storageRef = ref(storage, `/files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = Math.fround(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(prog);
      },
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => console.log(url));
      }
    );
  };

  return (
    <Box sx={{ display: "flex", paddingY: 3, borderTop: 1, borderBottom: 1 }}>
      <Avatar sx={{ width: 56, height: 56, marginRight: 2 }}></Avatar>
      <Box sx={{ width: "100%" }}>
        <TextField
          type="text"
          id="standard-multiline-flexible"
          multiline
          sx={{ width: "100%" }}
          inputProps={{ maxLength: 130 }}
          placeholder="調子はどう？"
          value={post}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setPost(e.target.value)
          }
        />
        {/* <form onSubmit={handleImage}>
          <input type="file" />
          <button type="submit">upload</button>
        </form>
        <h3>uploaded{progress} % </h3> */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 2,
            borderTop: 1,
            paddingTop: 2,
          }}
        >
          <Button>画像</Button>
          <p>{`${post.length} / 130`}</p>
          <Button onClick={handlePost} disabled={post.length === 0}>
            投稿
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
