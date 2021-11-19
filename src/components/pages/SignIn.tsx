import { ChangeEvent, useState, VFC } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "@firebase/auth";

import { AuthButton } from "../atoms/button/AuthButton";

const center = {
  width: "300px",
  margin: "0 auto",
};

export const SignIn: VFC = () => {
  const history = useHistory();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSignIn = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    await signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        history.push("/home");
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  return (
    <div style={center}>
      <h1>ログイン</h1>
      {error && <p>{error}</p>}
      <form onSubmit={handleSignIn}>
        <div>
          <input
            name="email"
            type="email"
            placeholder="メールアドレス"
            value={email}
            onChange={handleChangeEmail}
          />
        </div>
        <div>
          <input
            name="password"
            type="password"
            placeholder="パスワード"
            value={password}
            onChange={handleChangePassword}
          />
        </div>
        <div>
          <AuthButton>ログイン</AuthButton>
        </div>
        <p>
          新規登録は<Link to="/signup">こちら</Link>から
        </p>
      </form>
    </div>
  );
};
