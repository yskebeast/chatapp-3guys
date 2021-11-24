import { ThemeProvider } from "@emotion/react";
import { createTheme, TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import { ChangeEvent, memo, VFC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAppDispatch } from "../../app/hooks";
import { selectUser } from "../../features/userSlice";

export const SelfIntro: VFC = memo(() => {
  const loginUser = useSelector(selectUser);
  const dispach = useAppDispatch();

  return (
    // <ThemeProvider theme={theme}>
    <Box sx={{ width: "60%", marginX: "auto", textAlign: "center" }}>
      <h1>プロフィールを編集</h1>
      <div>
        <img
          style={{ width: "150px", height: "150px", background: "white" }}
          src=""
          alt=""
        />
      </div>
      <div>
        <p style={{ textAlign: "left" }}>名前</p>
        <TextField
          sx={{ width: "100%" }}
          type="text"
          value={loginUser.username}
          // onChange={(e: ChangeEvent<HTMLInputElement>) =>
          //   dispach(loginUser({username: e.target.value}))
          // }
        />
      </div>
      <div>
        <p style={{ textAlign: "left" }}>自己紹介</p>
        <TextField
          sx={{ width: "100%" }}
          type="text"
          value={loginUser.selfIntro}
          // onChange={(e: ChangeEvent<HTMLInputElement>) =>
          //   dispach(loginUser.selfIntro(e.target.value))
          // }
        />
      </div>
      <div>
        <p style={{ textAlign: "left" }}>生年月日</p>
        <TextField
          sx={{ width: "100%" }}
          type="text"
          value="1999年11月11日"
          // onChange={(e: ChangeEvent<HTMLInputElement>) =>
          //   dispach(loginUser.selfIntro(e.target.value))
          // }
        />
      </div>
    </Box>
    // </ThemeProvider>
  );
});
