import { VFC } from "hoist-non-react-statics/node_modules/@types/react";
import { useHistory } from "react-router";

export const Home: VFC = () => {
  const history = useHistory();
  const handleLogout = () => {
    history.push("/");
  };
  return (
    <div>
      <h1>メイン画面</h1>
      <button onClick={handleLogout}>ログアウト</button>
    </div>
  );
};
