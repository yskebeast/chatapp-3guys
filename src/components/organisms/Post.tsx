import { collection, getDocs } from "@firebase/firestore";
import { useState, VFC } from "react";

type Props = {
  index: any;
  message: any;
};
export const Post: VFC<Props> = (props) => {
  const { index, message } = props;

  const [close, setClose] = useState(false);
  const [like, setLike] = useState<number>(0);

  const handleSend = () => {
    setClose(!close);
  };

  const handleLike = () => {
    setLike(like + 1);
    if (like === 1) {
      setLike(like - 1);
    }
  };

  const handleReply = () => {
    console.log(message.id);
  };

  return (
    <div>
      <h1>{message.name}</h1>
      <li>{message.tweet}</li>
      {close && (
        <div>
          <ul>
            <li>リプライ</li>
          </ul>
          <div>
            <input type="text" />
            <button onClick={handleReply}>送信</button>
          </div>
        </div>
      )}
      <button onClick={handleLike}>いいね{like}</button>
      <button onClick={handleSend}>
        {close ? <p>閉じる</p> : <p>返信</p>}
      </button>
    </div>
  );
};
