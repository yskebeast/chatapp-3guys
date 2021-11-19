import { useContext, VFC } from "react";
import { useHistory } from "react-router";
import { AuthUserContext } from "../../providers/AuthUserProvider";

export const Home: VFC = () => {
  const history = useHistory();

  const { user } = useContext(AuthUserContext);

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
