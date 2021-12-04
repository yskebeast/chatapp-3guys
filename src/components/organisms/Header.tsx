import React, { VFC } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { Link, useHistory } from "react-router-dom";

const Header: VFC = () => {
  const history = useHistory();
  const buttonUser = () => {
    history.push("./userlist");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit">timeline</Button>
          <Button color="inherit" onClick={buttonUser}>
            userlist
          </Button>
          <Button color="inherit">acount</Button>
          {/* <Link to="./userlist">USER LISTへ</Link> */}
          <Button color="inherit">Logout</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
