import { useState, VFC } from "react";

type Props = {
  message: {
    name: string;
    tweet: string;
  };
};

export const ReplyPost: VFC<Props> = (props) => {
  const { message } = props;

  const [count, setCount] = useState(0);

  return (
    <div>
      <p style={{ fontWeight: "bold", color:"skyblue" }}>{message.name}</p>
      <li>{message.tweet}</li>
      <button onClick={() => setCount(count + 1)}>{count}</button>
    </div>
  );
};
