import { VFC } from "hoist-non-react-statics/node_modules/@types/react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { AuthButton } from "../atoms/button/AuthButton";

export const SignUp: VFC = () => {
  const history = useHistory();
  const handleSignUp = () => {
    history.push("/home");
  };

  return (
    <div>
      <h1>アカウントを作成</h1>
      <form onSubmit={handleSignUp}>
        <div>
          <input name="name" type="text" placeholder="名前" />
        </div>
        <div>
          <input name="email" type="email" placeholder="メールアドレス" />
        </div>
        <div>
          <input name="password" type="password" placeholder="パスワード" />
        </div>
        <div>
      <AuthButton>登録</AuthButton>
        </div>
        <p>ログインは<Link to='/'>こちら</Link>から</p>
      </form>
    </div>
  );
};
