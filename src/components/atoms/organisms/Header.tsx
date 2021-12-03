import React, { VFC } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom";
import { signOut } from "@firebase/auth";
import { auth } from "../../../firebase";

const Header: VFC = () => {

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit">timeline</Button>
          <Button color="inherit">userlist</Button>
          <Button color="inherit">acount</Button>
          <Button color="inherit">
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
