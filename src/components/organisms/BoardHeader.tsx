import React from "react";

import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";

import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import { useHistory } from "react-router";
import { signOut } from "@firebase/auth";
import { auth } from "../../firebase";

export const BoardHeader = () => {
   const loginUser = useSelector(selectUser);
   const history = useHistory();

   const handleLogout = () => {
      signOut(auth).then(() => {
         history.push("/");
      });
   };

   return (
      <Box
         sx={{
            display: "flex",
            justifyContent: "space-between",
         }}
      >
         <p>Home</p>
         <p>
            {loginUser.username}
            <span>さん</span>
         </p>
         <Button onClick={handleLogout}>ログアウト</Button>
      </Box>
   );
};
