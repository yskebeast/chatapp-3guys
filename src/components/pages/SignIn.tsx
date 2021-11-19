import { VFC } from "react-router/node_modules/@types/react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { AuthButton } from "../atoms/button/AuthButton";

export const SignIn: VFC = () => {
  const history = useHistory();
  const handleSignIn = () => {
    history.push("/home")
};

  return (
    <div>
      <h1>ログイン</h1>
      <form onSubmit={handleSignIn}>
        <div>
          <input name="email" type="email" placeholder="メールアドレス" />
        </div>
        <div>
          <input name="password" type="password" placeholder="パスワード" />
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
