import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "@firebase/firestore";
import { ChangeEvent, useEffect, useState, VFC } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import { db } from "../../firebase";
import { ReplyPost } from "./ReplyPost";

type Props = {
  message: {
    id: string;
    tweet: string;
    name: string;
    uid: string;
  };
};
export const Post: VFC<Props> = (props) => {
  const { message } = props;

  const loginUser = useSelector(selectUser);

  const [both, setBoth] = useState(false);
  const [expand, setExpand] = useState(false);
  const [edit, setEdit] = useState(false);
  const [like, setLike] = useState<number>(0);
  const [reply, setReply] = useState<string>("");
  const [changeEdit, setChangeEdit] = useState<string>(message.tweet);
  const [messages, setMessages] = useState<Array<any>>([]);

  const match = message.uid === loginUser.uid;

  useEffect(() => {
    const subCollection = collection(db, "board", message.id, "reply");
    const q = query(subCollection, orderBy("time", "desc"));
    onSnapshot(q, (querySnapshot) => {
      const arr: Array<any> = [];
      querySnapshot.forEach((doc) => {
        arr.push({
          name: doc.data().name,
          tweet: doc.data().tweet,
        });
      });
      setMessages(arr);
    });
  }, []);

  const handleReply = async () => {
    if (reply === "") return;
    const timestamp = serverTimestamp();
    const newMessages = [...messages, reply];
    setMessages(newMessages);
    await addDoc(collection(db, "board", message.id, "reply"), {
      tweet: reply,
      time: timestamp,
      name: loginUser.username,
    });
    setReply("");
  };

  const handleLike = () => {
    console.log(message.id);
    setLike(like + 1);
    if (like === 1) {
      setLike(like - 1);
    }
  };

  const handleUpdate = async () => {
    const cityRef = doc(db, "board", message.id);
    await updateDoc(cityRef, {
      tweet: changeEdit,
    });
    setEdit(!edit);
  };

  const handleDelete = async () => {
    const deleteBtn = window.confirm("削除しても良いですか");
    if (deleteBtn) {
      await deleteDoc(doc(db, "board", message.id));
      setExpand(false);
    }
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <p style={{ fontWeight: "bold" }}>{message.name}</p>
        <p>{}</p>
        {match && (
          <div style={{ display: "flex", alignItems: "center" }}>
            <button onClick={() => setExpand(!expand)}> ・・・</button>
            {expand && (
              <>
                <div>
                  <button onClick={() => setEdit(!edit)}>編集</button>
                  <button onClick={handleDelete}>削除</button>
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
                    <button onClick={handleUpdate}>更新</button>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
      <li>{message.tweet}</li>
      {both && (
        <div>
          <ul style={{ listStyle: "none" }}>
            {messages.map((message, index) => {
              return <ReplyPost key={index} message={message} />;
            })}
          </ul>
          <div>
            <input
              type="text"
              value={reply}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setReply(e.target.value)
              }
            />
            <button onClick={handleReply}>送信</button>
          </div>
        </div>
      )}
      <button onClick={() => setBoth(!both)}>
        {both ? <span>閉じる</span> : <span>開く</span>}
      </button>
      <button onClick={handleLike}>いいね{like}</button>
    </div>
  );
};
