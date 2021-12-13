import { memo, useEffect, useState } from "react";
import { collection, getDocs, orderBy, query } from "@firebase/firestore";
import { db } from "../../firebase";

import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";

import { BoardHeader } from "../organisms/BoardHeader";
import { BoardInputPost } from "../organisms/BoardInputPost";
import { BoardPost } from "../organisms/BoardPost";
import { Loading } from "../atoms/progress/Loading";
import { ArrPostType } from "../../types/type";
import { BoardNonPost } from "../organisms/BoardNonPost";

export const Board = memo(() => {
   const [posts, setPosts] = useState<Array<ArrPostType>>([]);
   const [load, setLoad] = useState(false);
   const [view, setView] = useState(false);

   useEffect(() => {
      setView(true);
      let arr: ArrPostType[] = [];
      const getPost = async () => {
         const q = query(collection(db, "board"), orderBy("time", "desc"));
         const querySnapshot = await getDocs(q);
         querySnapshot.forEach((doc) => {
            arr.push({
               id: doc.id,
               name: doc.data().name,
               post: doc.data().post,
               time: doc.data({ serverTimestamps: "estimate" }).time.toDate(),
               image: doc.data().image,
            });
         });
         setPosts(arr);
         setView(false);
         setLoad(false);
      };
      getPost();
   }, [load]);

   // useEffect(() => {
   //   setLoad(false);
   // }, [load]);

   return (
      <Box sx={{ bgcolor: "#f0f8ff", paddingTop: 5, paddingBottom: 3 }}>
         <CssBaseline />

         <Container
            maxWidth="md"
            sx={{ bgcolor: "white", paddingTop: 3, marginBottom: 5 }}
         >
            {/* ヘッダー */}
            <BoardHeader />

            {/* 投稿入力部分 */}
            <BoardInputPost setLoad={setLoad} />
         </Container>

         <Container maxWidth="md" sx={{ bgcolor: "white", height: "100%" }}>
            {/* 投稿数が0の時に表示する画面 */}
            {posts.length === 0 && <BoardNonPost />}

            {/* 投稿がある時に表示する画面 */}
            {view ? (
               // ローティング画面
               <Loading />
            ) : (
               <>
                  {/* メイン投稿 */}
                  <ul style={{ listStyle: "none", paddingLeft: 0 }}>
                     {posts.map((post, index) => {
                        return (
                           <Box key={index}>
                              <BoardPost post={post} setLoad={setLoad} />
                           </Box>
                        );
                     })}
                  </ul>
               </>
            )}
         </Container>
      </Box>
   );
});
