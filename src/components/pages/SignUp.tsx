import { ChangeEvent, memo, useState, VFC } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { auth, db } from "../../firebase";
import { createUserWithEmailAndPassword } from "@firebase/auth";

import { AuthButton } from "../atoms/button/AuthButton";
import { doc, setDoc } from "@firebase/firestore";

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
    <div>
      <h1>アカウントを作成</h1>
      {error && <p>{error}</p>}
      <form onSubmit={handleSignUp}>
        <div>
          <input
            name="name"
            type="text"
            placeholder="名前"
            value={name}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div>
          <textarea
            name="text"
            placeholder="自己紹介"
            value={selfIntro}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
              setSelfIntro(e.target.value);
            }}
          />
        </div>
        <div>
          <input
            name="email"
            type="email"
            placeholder="メールアドレス"
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setEmail(e.target.value);
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
            }}
          />
        </div>
        <div>
          <AuthButton>登録</AuthButton>
        </div>
        <p>
          ログインは<Link to="/">こちら</Link>から
        </p>
      </form>
    </div>
  );
});
