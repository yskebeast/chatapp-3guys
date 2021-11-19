import { ChangeEvent, useState, VFC } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { auth, db } from "../../firebase";
import { createUserWithEmailAndPassword } from "@firebase/auth";

import { AuthButton } from "../atoms/button/AuthButton";
import { doc, setDoc } from "@firebase/firestore";

const center = {
  width: "300px",
  margin: "0 auto",
};

export const SignUp: VFC = () => {
  const history = useHistory();

  const [name, setName] = useState<string>("");
  const [selfIntro, setSelfIntro] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const uid = auth.currentUser?.uid;

  const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const handleChangeSelfIntro = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setSelfIntro(e.target.value);
  };
  const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSignUp = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    await createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        history.push("/home");
        setDoc(doc(db, "users", `${uid}`), {
          name: name,
          selfIntro: selfIntro,
        });
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  return (
    <div style={center}>
      <h1>アカウントを作成</h1>
      {error && <p>{error}</p>}
      <form onSubmit={handleSignUp}>
        <div>
          <input
            name="name"
            type="text"
            placeholder="名前"
            value={name}
            onChange={handleChangeName}
          />
        </div>
        <div>
          <textarea
            name="text"
            placeholder="自己紹介"
            value={selfIntro}
            onChange={handleChangeSelfIntro}
          />
        </div>
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
          <AuthButton>登録</AuthButton>
        </div>
        <p>
          ログインは<Link to="/">こちら</Link>から
        </p>
      </form>
    </div>
  );
};
