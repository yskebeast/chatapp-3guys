import React, { ChangeEvent, useRef } from "react";
import { useBoard } from "../../hooks/useBoard";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import PhotoIcon from "@mui/icons-material/Photo";

export const MainPost = () => {
  const { tweet, setTweet, handleTweet } = useBoard();

  const inputRef = useRef<any>(null);

  return (
    <Container
      sx={{
        width: "100%",
        borderTop: 1,
        borderBottom: 1,
        paddingTop: 3,
        paddingBottom: 3,
      }}
    >
      <Box sx={{ width: "100%", margin: "0 auto" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "1rem",
            paddingBottom: "1rem",
            borderBottom: "1",
          }}
        >
          <Avatar sx={{ width: 56, height: 56, marginRight: 2 }}></Avatar>
          <TextField
            type="text"
            id="standard-multiline-flexible"
            multiline
            sx={{ width: "100%" }}
            value={tweet}
            placeholder="調子はどう？"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setTweet(e.target.value)
            }
          />
        </Box>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <button onClick={() => inputRef.current.click()}>画像</button>
          <input
            hidden
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              console.log(e.target.files);
            }}
          />
            <PhotoIcon sx={{fontSize:30}} />
          <Button
            sx={{ borderRadius: 16, paddingX: 3 }}
            variant="contained"
            onClick={handleTweet}
          >
            投稿
          </Button>
        </div>
      </Box>
    </Container>
  );
};
