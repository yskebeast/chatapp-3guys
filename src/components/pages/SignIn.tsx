import { ChangeEvent, memo, useState, VFC } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "@firebase/auth";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import { Alert, Avatar, Button, CssBaseline, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const theme = createTheme();

export const SignIn = memo(() => {
  const history = useHistory();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSignIn = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    await signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        history.push(`/home/${auth.currentUser?.uid}`);
      })
      .catch((err) => {
        setPassword("");
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
          <Typography
            sx={{ textAlign: "center", my: 1 }}
            component="h1"
            variant="h5"
            >
            ログイン
          </Typography>
          {/* {error && <p>{error}</p>} */}
            {error && <Alert severity="error">{error}</Alert>}
          <form  onSubmit={handleSignIn}>
            <TextField
              id="outlined-basic"
              label="メールアドレス"
              margin="normal"
              variant="outlined"
              name="email"
              type="email"
              fullWidth
              required
              value={email}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setEmail(e.target.value);
              }}
            />
            <TextField
              id="outlined-basic"
              label="パスワード"
              margin="normal"
              variant="outlined"
              name="password"
              type="password"
              fullWidth
              required
              value={password}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setPassword(e.target.value);
              }}
            />
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 2, mb: 2 }}
              type="submit"
            >
              ログイン
            </Button>
            <Typography component="p" sx={{ textAlign: "right" }}>
              新規登録は<Link to="/signup">こちら</Link>から
            </Typography>
          </form>
        </Box>
      </Container>
    </ThemeProvider>
  );
});
