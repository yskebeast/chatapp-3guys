import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Avatar from "../atoms/avatar/Avatar";
import "./Card.css";
import {
  addDoc,
  collection,
  doc,
  setDoc,
  query,
  where,
  getDoc,
  getDocs,
} from "firebase/firestore";
import { db } from "../../firebase";
import { async } from "@firebase/util";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { selectUser, userSlice } from "../../features/userSlice";
import { useSelector } from "react-redux";

type PropsType = {
  UserDocumentId: string;
  // id: string;
  img: string;
  name: string;
};

export default function ActionAreaCard(props: PropsType) {
  const { UserDocumentId, img, name } = props;
  const history = useHistory();
  const loginUser = useSelector(selectUser);
  const loginUserUsername = useSelector(selectUser).username;
  const userId = console.log();
  const yobidasi = async () => {};
  const [id, setid] = useState<string>("");
  const LoginUserDocumentId = useSelector(selectUser).uid;

  const [roomid, setroomid] = useState<string>("");
  console.log(roomid);

  const UserInformation = async () => {
    await setDoc(
      doc(db, "chatroom", `${LoginUserDocumentId + UserDocumentId}`),
      {
        name1: loginUserUsername,
        name2: name,
      }
    );
    console.log("====================================");
    console.log("CreateChatroom,By:" + name + "&" + loginUserUsername);
    console.log("====================================");
    const hensu = LoginUserDocumentId + UserDocumentId;
    setroomid(hensu);
    history.push(`/directmessage/${LoginUserDocumentId + UserDocumentId}`);
    //次のページに作成したチャットルームのIDを引数として渡す。
  };

  const SerchDocuent = async () => {
    let CheckValue: boolean = false;
    const q = query(collection(db, "chatroom"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      if (
        doc.id === `${UserDocumentId + LoginUserDocumentId}` ||
        doc.id === `${LoginUserDocumentId + UserDocumentId}`
      ) {
        console.log("_________EnterAnExitingChatroom_________");
        // id = { chatId: doc.id };
        history.push(`/directmessage/${doc.id}`); 
        // window.history.pushState({}, "", ""); //引数にname(押すボタンの名前)を渡したい。
        CheckValue = true;
        //次のページに作成したチャットルームのIDを引数として渡す。
      } else {
        if (!CheckValue) {
          console.log("ID参照開始__");
          console.log(doc.id);
          console.log(`${UserDocumentId + LoginUserDocumentId}`);
          console.log("__ID参照終了");
        }
      }
    });
    if (!CheckValue) {
      UserInformation(); //chatroomで参照できなかったので、chatroom内で新規ルームを作成
    }
  };

  return (
    <Card className="Card__card" sx={{ maxWidth: 250 }}>
      <Avatar />
      <CardActionArea>
        <CardContent onClick={SerchDocuent}>
          <Typography
            className="Card__card__font"
            gutterBottom
            variant="h5"
            component="div"
          >
            {name}
          </Typography>
          <Typography
            className="Card__card__font-selfIntro"
            variant="body2"
            color="text.secondary"
          >
            {img}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
