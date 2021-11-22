import { ChangeEvent, memo, useState, VFC } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "@firebase/auth";

import { AuthButton } from "../atoms/button/AuthButton";
import { useDispatch, useSelector } from "react-redux";
import { email, password, error } from "../../features/certificationSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { certificationState } from "../../features/certificationSlice";

const center = {
  width: "300px",
  margin: "0 auto",
};

export const SignIn = memo(() => {
  const history = useHistory();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  // const { text } = useSelector((state) => state.certification);
  // const text = useAppSelector((state) => state.certification.text);
  // const dispach = useAppDispatch();

  const handleSignIn = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    await signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        history.push(`/home/${auth.currentUser?.uid}`);
      })
      .catch((err) => {
        setPassword("");
        setError(err.message);
        // dispach(error(err.message));
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
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setEmail(e.target.value);
              // dispach(email(e.target.value));
            }}
          />
        </div>
        <div>
          <input
            name="password"
            type="password"
            placeholder="パスワード"
            value={password}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setPassword(e.target.value);
              // dispach(email(e.target.value));
            }}
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
});
