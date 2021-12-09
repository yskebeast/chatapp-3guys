import { ChangeEvent, memo, useState, VFC } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { auth, db } from "../../firebase";
import { createUserWithEmailAndPassword } from "@firebase/auth";
import { doc, setDoc } from "@firebase/firestore";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Avatar,
  Button,
  Container,
  CssBaseline,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import Typography from "@mui/material/Typography";

const theme = createTheme();

export const SignUp: VFC = memo(() => {
  const history = useHistory();

  const [name, setName] = useState<string>("");
  const [selfIntro, setSelfIntro] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSignUp = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    await createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        setDoc(doc(db, "users", `${auth.currentUser?.uid}`), {
          name: name,
          selfIntro: selfIntro,
        });
        history.push(`/home/${auth.currentUser?.uid}`);
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
          <Typography component="h1" variant="h5">
            アカウントを作成
          </Typography>
          {error && <p>{error}</p>}
          <form onSubmit={handleSignUp}>
            <TextField
              required
              fullWidth
              sx={{ mt: 3, mb: 1 }}
              label="名前"
              name="name"
              type="text"
              value={name}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setName(e.target.value);
              }}
            />
            <TextField
              required
              fullWidth
              sx={{ mt: 1, mb: 1 }}
              label="自己紹介"
              name="selfIntro"
              multiline
              rows="3"
              value={selfIntro}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                setSelfIntro(e.target.value);
              }}
            />
            <TextField
              required
              fullWidth
              sx={{ mt: 1, mb: 1 }}
              label="メールアドレス"
              name="email"
              type="email"
              value={email}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setEmail(e.target.value);
              }}
            />
            <TextField
              required
              fullWidth
              sx={{ mt: 1, mb: 2 }}
              label="パスワード"
              name="password"
              type="password"
              placeholder="パスワード"
              value={password}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setPassword(e.target.value);
              }}
            />
            <Button
              sx={{ mt: 1, mb: 2 }}
              type="submit"
              fullWidth
              variant="contained"
            >
              登録
            </Button>
            <Typography component="p" sx={{ textAlign: "right" }}>
              ログインは<Link to="/">こちら</Link>から
            </Typography>
          </form>
        </Box>
      </Container>
    </ThemeProvider>
  );
});
