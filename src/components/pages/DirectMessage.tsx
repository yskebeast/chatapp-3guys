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
  query,
  where,
} from "firebase/firestore";
import React from "react";
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
  const [chatCtl] = React.useState(new ChatController());
  const { pageId } = useParams<any>();
  // パラムスでオブジェクトを取ってきている
  console.log(pageId);
  const loginUser = useSelector(selectUser);
  const loginUserUsername = useSelector(selectUser).username;

  let ChatPartner: string;

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
      where("name", "==", `${ChatPartner}`)
    );
    const querySnapshot = await getDocs(q);
    setTimeout(() => {
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id);
        console.log(doc.data().text);
        // console.log(doc.data);
        chatCtl.addMessage({
          type: "text",
          content: "a",
          // content: `${doc.data().text}`,
          self: true,
          // console.log()
        });
        console.log(`${doc.data().text}`);
        console.log("aa");
      }, 100 * 10000);
      //   //collecitonで実行できないのでdocの取得を行い再度実行を行う。s
    });
    console.log("終了");
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

  React.useMemo(async () => {
    // console.log(history);
    // Chat content is displayed using ChatController
    await chatCtl.addMessage({
      type: "text",
      content: `Hello, What's your name.`,
      self: false,
    });
    // firebaseから自分のチャットと相手のチャットを呼び出す関数を作成する。
    await chatCtl.addMessage({
      type: "text",
      content: `自分のコメントになっていますか`,
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
