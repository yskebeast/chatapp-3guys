// userの読み込み a・b
// firebase chatの読み込み

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
  setDoc,
  where,
  serverTimestamp,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import "./DirectMessage.css";
import { useHistory, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser, userSlice } from "../../features/userSlice";
import { resolve } from "path/win32";
import { wait } from "@testing-library/user-event/dist/utils";
import { async } from "@firebase/util";

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
  const [Mydata, setMyData] = useState<string[]>();
  const [chatCtl] = React.useState(new ChatController());
  const { pageId } = useParams<any>();
  // パラムスでオブジェクトを取ってきている (URLからユーザーのIDを取得している。)
  console.log(pageId);
  // const loginUser = useSelector(selectUser);
  // const [loginUser,setLoginUser] = useState<string[]>();

  let ChatPartner: string;
  let i: string;
  let forI: number;
  forI = 0;
  const chatDataPartner: string[] = [];
  const MychatData: string[] = [];
  const loginUserUsername = useSelector(selectUser).username;

  if (loginUserUsername === "") {
    console.log("null");
    console.log("頭のログ");
  }
  const [LoadingUserFromRedux, setLoadingUserFromRedux] = useState(true);
  //loginusernameのローディング
  React.useEffect(() => {
    if (loginUserUsername !== "") {
      const checkBoolean = false;
      setLoadingUserFromRedux(checkBoolean);
      console.log(
        "__1__" + "ログインUSER NAME読み込み成功" + loginUserUsername + ""
      );
    } else {
      console.log("ローディング中");
    }
  }, [loginUserUsername]); //レンダリング阻止

  //ドキュメントを取得し、フィールドから相手の名前を取得する。
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
        console.log("__2__" + "二人の名前を出力できていれば成功____________");
        console.log(ChatPartner);
        console.log(loginUserUsername);
        console.log("____________");
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    };
    yourName();
  };
  getUserData();

  const [LoadingGetUser, setLoadingGetUser] = useState(true);
  React.useEffect(() => {
    if (loginUserUsername !== "" || ChatPartner !== "") {
      setLoadingGetUser(false);
      console.log("__3__" + "chatdata/loginuser取得済み");
    } else {
      console.log("ドキュメント取得中");
    }
  }, [loginUserUsername]);

  //相手のチャットデータ読み込み
  async function ExitingTextOutputChatDataGet() {
    console.log("__4__01__");
    useEffect(() => {
      console.log("__4__02__");
      const q = query(
        collection(db, "chatroom", `${pageId}`, "message"),
        where("name", "==", `${ChatPartner}`),
        orderBy("timestanp", "asc")
      );
      const querySnapshotFunction = async () => {
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          console.log(doc.data().text);
          chatDataPartner.push(doc.data().text);
          console.log("現在チャットデータ取得中");
        });
        setDataPartner(chatDataPartner);
      };
      querySnapshotFunction();
    }, []);
  }
  // ExitingTextOutputChatDataGet();
  console.log("====================================");
  console.log("相手のチャットデータ読み込み完了");
  console.log("__5__" + "{}", setDataPartner);
  console.log("====================================");
  //ここで判別を行っている

  // ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝

  // ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝ｓｓ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
  async function ExitingTextOutputMyDataGet() {
    console.log("__6__" + "");
    // const [LoadingQuerySnapshot2, setLoadingQuerySnapshot2] = useState(true);
    // React.useEffect(() => {
    //   if (
    //     loginUserUsername !== "" ||
    //     ChatPartner !== "" ||
    //     query !== undefined
    //   ) {
    //     setLoadingQuerySnapshot2(false);
    //     console.log("__5__" + "きていますか");
    //   } else {
    //     console.log("読み込み中");
    //   }
    // }, [setLoadingQuerySnapshot2]);
    useEffect(() => {
      const w = query(
        collection(db, "chatroom", `${pageId}`, "message"),
        where("name", "==", `${loginUserUsername}`),
        orderBy("timestanp", "asc")
      );
      const querySnapshotFunctionMydata = async () => {
        const querySnapshotMydata = await getDocs(w);
        querySnapshotMydata.forEach((doc) => {
          console.log(doc.data().text);
          MychatData.push(doc.data().text);

          console.log("====================================");
          console.log("__7__");
          console.log("====================================");

          setMyData(MychatData);
        }, []);
      };
      querySnapshotFunctionMydata();
    });
  }
  // ExitingTextOutputMyDataGet();

  // setLoadingNow(true);
  // React.useEffect(() => {
  //   if (setMyData !== null || setMyData !== undefined || setMyData !== "") {
  //     setLoadingNow(false);
  //     continueGetData();
  //     console.log("aaa");
  //   }
  // }, [setLoadingNow]);
  async function continueGetData() {
    console.log("__8__");
    console.log("====================================");
    console.log("きてる？？");
    console.log("====================================");
    MychatData.map(async () => {
      console.log(MychatData);
      await chatCtl.addMessage({
        type: "text",
        content: `${setMyData}`,
        self: true,
      });
    });
  }
  // continueGetData();

  //ここで判別を行っている。
  // const [LoadingNow, setLoadingNow] = useState(true);
  // React.useEffect(() => {
  //   if (setDataPartner !== null || setDataPartner !== undefined) {
  //     setLoadingNow(false);
  //     ExitingTextOutput();
  //   }
  // }, [setDataPartner]);

  const yobidasi = async () => {
    console.log("__9__");
    const querySnapshot = await getDocs(
      collection(db, "chatroom", "message", pageId)
    );
    querySnapshot.forEach((doc) => {
      const message = [];
      message.push();
    });
  };
  // yobidasi();
  //チャットデータの呼び出し
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
    // for (
    //   let i = 0;
    //   i <= forI;
    //   i++ //この中にforで直接代入する。
    // )
    //   await chatCtl.addMessage({
    //     type: "text",
    //     content: `${ChatPartner}`,
    //     self: true,
    //   });  //相手のチャットを読み込もうとしてるのではないだろうか...
    // ]

    const name = chatCtl.setActionRequest(
      {
        type: "text",
        always: true,
      },
      async (response) => {
        console.log("{}", response);

        // funcitonInputSetMychatDataSubmit(response.value);
        // await setDoc(doc(db, "chatroom", `${pageId}`, "message"), {
        //   name: "大場春希",
        //   text: response.value,
        //   timestanp: serverTimestamp(),
        // });
        // await wait(500000);
      }
    );
    console.log();
  }, [chatCtl]);

  // <MuiChat chatController={chatCtl} />;

  // Only one component used for display
  return (
    <div className="DirectMessage__feild">
      <p>{pageId}</p>
      <ThemeProvider theme={muiTheme}>
        <div className="DirectMessage__Muichat">
          <MuiChat chatController={chatCtl} />
        </div>
      </ThemeProvider>
    </div>
  );
};

//レンダリングが二回行われている
//usestateの中に値を入れたい
