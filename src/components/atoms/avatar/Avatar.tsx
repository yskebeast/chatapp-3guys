import * as React from "react";
import Avatar from "@mui/material/Avatar";

export default function ActionAreaCard() {
  return (
    <Avatar
      sx={{ mx: "auto" }}
      alt="Remy Sharp"
      src="/static/images/avatar/1.jpg" // 返り値を指定する。
      style={{ marginTop: 50, marginBottom: 50 }}
    />
  );
}
// state
