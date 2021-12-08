import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
} from "@firebase/firestore";
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

import { BoardHeader } from "../organisms/BoardHeader";
import { BoardInputPost } from "../organisms/BoardInputPost";
import { BoardPost } from "../organisms/BoardPost";
import { Loading } from "../atoms/progress/Loading";
import { Arrtype } from "../../types/type";
import { BoardNonPost } from "../organisms/BoardNonPost";

export const Board = () => {
  const [posts, setPosts] = useState<Array<Arrtype>>([]);
  const [load, setLoad] = useState(false);
  const [view, setView] = useState(false);

  useEffect(() => {
    setView(true);
    let arr: Arrtype[] = [];
    const getPost = async () => {
      const q = query(collection(db, "board"), orderBy("time", "desc"));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        arr.push({
          id: doc.id,
          name: doc.data().name,
          post: doc.data().post,
          time: doc.data({ serverTimestamps: "estimate" }).time.toDate(),
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
    <Container maxWidth="md" sx={{ bgcolor: "#f8f8ff", height: "100%" }}>
      {/* ヘッダー */}
      <BoardHeader />

      {/* 投稿入力部分 */}
      <BoardInputPost setLoad={setLoad} />

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
  );
};
