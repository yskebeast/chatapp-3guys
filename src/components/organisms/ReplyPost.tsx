import { deleteDoc, doc, updateDoc } from "@firebase/firestore";
import { ChangeEvent, useState, VFC } from "react";
import { db } from "../../firebase";

type Props = {
  message: {
    name: string;
    tweet: string;
    id: string;
    time: any;
  };
  boardId: string;
};

export const ReplyPost: VFC<Props> = (props) => {
  const { message, boardId } = props;

  const [count, setCount] = useState(0);
  const [expand, setExpand] = useState(false);
  const [edit, setEdit] = useState(false);
  const [changeEdit, setChangeEdit] = useState<string>(message.tweet);

  const formatTime: any = `${message.time.getFullYear()}/${
    message.time.getMonth() + 1
  }/${message.time.getDate()} ${message.time.getHours()}:${message.time.getMinutes()}`;

  const handleReplyUpdate = async () => {
    const replyRef = doc(db, "board", boardId, "reply", message.id);
    await updateDoc(replyRef, {
      tweet: changeEdit,
    });
    setEdit(!edit);
  };

  const handleReplyDelete = async () => {
    const deleteBtn = window.confirm("本当に削除しますか");
    if (deleteBtn) {
      await deleteDoc(doc(db, "board", boardId, "reply", message.id));
      setExpand(false);
    }
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <p style={{ fontWeight: "bold", color: "skyblue", margin: 0 }}>
          {message.name}
        </p>
        <p>{formatTime}</p>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <button onClick={() => setExpand(!expand)}> ・・・</button>
          {expand && (
            <>
              <div style={{}}>
                <button onClick={() => setEdit(!edit)}>編集</button>
                <button onClick={handleReplyDelete}>削除</button>
              </div>
              {edit && (
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <input
                    type="text"
                    value={changeEdit}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setChangeEdit(e.target.value)
                    }
                  />
                  <button onClick={handleReplyUpdate}>更新</button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <li>{message.tweet}</li>
      <button onClick={() => setCount(count + 1)}>{count}</button>
    </div>
  );
};
