import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Avatar from "../atoms/avatar/Avatar";
import "./Card.css";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { async } from "@firebase/util";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { selectUser, userSlice } from "../../features/userSlice";
import { useSelector } from "react-redux";

type PropsType = {
  img: string;
  name: string;
};

// urlを作る前提でやると。。
//チャットしたい人のボタンっを押す、ランダムのドキュメントIDを作成できるようにする。
//リンク作でdirectmessage/documentIDのURLに飛んで、そこのINPUTとボタンを作っていたら、そのDOCUMENTのIDのサブコレクション内のmessageに入れれば

//URLの飛ばせ方

export default function ActionAreaCard(props: PropsType) {
  const { img, name } = props;
  const history = useHistory();

  const loginUser = useSelector(selectUser);
  // console.log()

  // console.log(img);
  // console.log(name); ここは出力

  const [id, setid] = useState<string>("");

  const UserInformation = async () => {
    //チャットしたい人のボタンっを押す、ランダムのドキュメントIDを作成し、ドキュメントデータに自分の名前と相手の名前を代入
    //参照方法：((name1==tani||name2==tani) && (name1==oba||name2==oba))
    // await setDoc(doc(db, "user", "LA"), {
    //   name: "Los Angeles",
    //   state: "CA",
    //   country: "USA",
    // });
    const docRef = await addDoc(collection(db, "chatroom"), {
      name1: loginUser.username,
      name2: name,
      id: loginUser.uid,
    });
    // setid(docRef.id);
    // console.log(id);
    console.log("Document written with ID: ", docRef.id);
    history.push(`/directmessage/${docRef.id}`);
    // ページ遷移
  };

  return (
    <Card className="Card__card" sx={{ maxWidth: 250 }}>
      <Avatar />
      <CardActionArea>
        <CardContent onClick={UserInformation}>
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
