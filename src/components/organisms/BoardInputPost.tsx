import { ChangeEvent, useRef, useState } from "react";
import { db, storage } from "../../firebase";
import { addDoc, collection, serverTimestamp } from "@firebase/firestore";
import { useSelector } from "react-redux";

import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";

import { selectUser } from "../../features/userSlice";
import { InputPostType } from "../../types/type";
import { ref, uploadBytesResumable } from "@firebase/storage";

export const BoardInputPost = (props: InputPostType) => {
   const { setLoad } = props;
   const loginUser = useSelector(selectUser);

   const inputRef = useRef<any>(null);
   const [post, setPost] = useState<string>("");
   const [file, setFile] = useState<any>("");
   const [fileUrl, setFileUrl] = useState<any>(null);

   // ドキュメントに保存
   const handlePost = async (e: any) => {
      e.preventDefault();
      if (post === "") return;
      const timestamp = serverTimestamp();
      const ref = collection(db, "board");
      if (file.name) {
         await addDoc(ref, {
            post: post,
            time: timestamp,
            user: loginUser.uid,
            name: loginUser.username,
            image: file.name,
         });
      } else {
         await addDoc(ref, {
            post: post,
            time: timestamp,
            user: loginUser.uid,
            name: loginUser.username,
         });
      }
      setPost("");
      setLoad(!false);
      uploadFile(file);
      setFileUrl(null);
   };

   const uploadFile = (file: any) => {
      if (!file) return;
      const storageRef = ref(storage, `/files/${file.name}`);
      uploadBytesResumable(storageRef, file);
      setFile("");
   };

   // 画像ボタンクリック
   const fileUpload = () => {
      console.log(inputRef.current);
      inputRef.current.click();
   };

   // 画像プレビュー表示
   const onChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
      const imageFile = e.target.files![0];
      const imageUrl = URL.createObjectURL(imageFile);
      setFile(imageFile);
      setFileUrl(imageUrl);
   };

   return (
      <Box
         sx={{
            display: "flex",
            paddingY: 3,
            borderTop: 1,
            // borderBottom: 1
         }}
      >
         <Avatar sx={{ width: 56, height: 56, marginRight: 2 }}></Avatar>
         <Box sx={{ width: "100%" }}>
            <form onSubmit={handlePost}>
               <TextField
                  type="text"
                  id="standard-multiline-flexible"
                  multiline
                  sx={{ width: "100%", marginBottom: 2 }}
                  inputProps={{ maxLength: 130 }}
                  placeholder="調子はどう？"
                  value={post}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                     setPost(e.target.value)
                  }
               />
               {fileUrl && (
                  <img
                     src={fileUrl}
                     style={{ width: "400px", objectFit: "contain" }}
                     alt=""
                  />
               )}

               <Box
                  sx={{
                     display: "flex",
                     justifyContent: "space-between",
                     marginTop: 2,
                     borderTop: 1,
                     paddingTop: 2,
                  }}
               >
                  <Button onClick={fileUpload}>
                     <ImageIcon />
                  </Button>
                  <input
                     hidden
                     ref={inputRef}
                     type="file"
                     accept="image/*"
                     src={file}
                     style={{ display: "none" }}
                     onChange={onChangeImage}
                  />
                  <Box sx={{ display: "flex" }}>
                     <p>{`${post.length} / 130`}</p>
                     <Button
                        sx={{ marginLeft: 3 }}
                        type="submit"
                        disabled={post.length === 0}
                     >
                        投稿
                     </Button>
                  </Box>
               </Box>
            </form>
         </Box>
      </Box>
   );
};
