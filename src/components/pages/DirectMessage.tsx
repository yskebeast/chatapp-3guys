import { ChatController, MuiChat } from "chat-ui-react";
import {
  Box,
  Button,
  CssBaseline,
  Divider,
  Link,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import React, { useState } from "react";
import { db } from "../../firebase";
import "./DirectMessage.css";
import { useHistory, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser, userSlice } from "../../features/userSlice";

const muiTheme = createTheme({
  palette: {
    primary: {
      main: "#007aff",
    },
  },
});

export const DirectMessage = () => {
  console.log();
  const [dataPartner, setDataPartner] = useState<string[]>();
  const [yourdata, setyourData] = useState<string[]>();

  const [chatCtl] = React.useState(new ChatController());
  const { pageId } = useParams<any>();
  // パラムスでオブジェクトを取ってきている
  console.log(pageId);
  const loginUser = useSelector(selectUser);
  const loginUserUsername = useSelector(selectUser).username;

  let ChatPartner: string;
  let i: string;
  const chatDataPartner: string[] = [];
  const MychatData: string[] = [];
  console.log();
  console.log(
    "ログインユーザー" + loginUser + "ユーザーネーム" + loginUserUsername
  );

  //ドキュメントを取得し、フィールドから相手の名前を取得るす。
  const getUserData = async () => {
    const docRef = doc(db, "chatroom", `${pageId}`);
    const docSnap = await getDoc(docRef);
    const yourName = async () => {
      if (docSnap.exists()) {
        console.log("ドキュメントを取得〜");
        // console.log("Document data:", docSnap.data());
        if (!loginUserUsername === docSnap.data().name1) {
          ChatPartner = docSnap.data().name1;
        } else {
          ChatPartner = docSnap.data().name2;
        }
        console.log("____________");
        console.log(ChatPartner);
        console.log("____________");
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    };
    yourName();
  };
  getUserData();

  const ExitingTextOutput = async () => {
    const q = query(
      collection(db, "chatroom", `${pageId}`, "message"),
      where("name", "==", `${ChatPartner}`),
      orderBy("timestanp", "asc")
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.data().text);
      chatDataPartner.push(doc.data().text);
    });
    setDataPartner(chatDataPartner);

    const w = query(
      collection(db, "chatroom", `${pageId}`, "message"),
      where("name", "==", `${loginUserUsername}`),
      orderBy("timestanp", "asc")
    );
    const querySnapshot2 = await getDocs(w);
    querySnapshot2.forEach((doc) => {
      console.log(doc.data().text);
      MychatData.push(doc.data().text);
    });

    setyourData(MychatData);

    MychatData.map(async () => {
      console.log(MychatData);
      await chatCtl.addMessage({
        type: "text",
        content: `${MychatData}`,
        self: true,
      });
    });
  };
  ExitingTextOutput();

  // const yobidasi = async () => {
  //   const querySnapshot = await getDocs(
  //     collection(db, "chatroom", "message", pageId)
  //   );
  //   querySnapshot.forEach((doc) => {
  //     const message = [];
  //     message.push();
  //   });
  // };
  // yobidasi();


  //ここで判別を行っている。
  const [Loading, setLoading] = useState(true)
  React.useEffect(() => {
    if (setyourData !== undefined) {
      setLoading(false);
    }
  }, [setyourData]);


  React.useMemo(async () => {
    // console.log(history);
    // Chat content is displayed using ChatController
    await chatCtl.addMessage({
      type: "text",
      content: `Hello, What's your name.`,
      self: false,
    });
    // firebaseから自分のチャットと相手のチャットを呼び出す関数を作成する。
    for(let i=0;i<)//この中にforで直接代入する。
    await chatCtl.addMessage({
      type: "text",
      content: `${ChatPartner}`,
      self: true,
    });

    const name = await chatCtl.setActionRequest(
      {
        type: "text",
        always: true,
      },
      (response) => {
        console.log(response.value);
      }
    );
    console.log();
  }, [chatCtl]);

  // <MuiChat chatController={chatCtl} />;

  // Only one component used for display
  return (
    <div className="DirectMessage__feild">
      {/* <p>{pageId}</p> */}
      <ThemeProvider theme={muiTheme}>
        <button> aaa</button>
        <div className="DirectMessage__Muichat">
          <MuiChat chatController={chatCtl} />
        </div>
      </ThemeProvider>
    </div>
  );
};
