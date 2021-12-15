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
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import React from "react";
import { db } from "../../firebase";
import "./DirectMessage.css";
import { useHistory, useParams } from "react-router-dom";

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

  const ExitingTextOutput = async () => {
    const q = query(
      collection(db, "cities", "message"),
      where("name", "==", "大場春希")
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
    });
    await chatCtl.addMessage({
      type: "text",
      content: `Hello, What's your name.`,
      self: false,
    });
  };

  const yobidasi = async () => {
    const querySnapshot = await getDocs(
      collection(db, "chatroom", "message", pageId)
    );
    querySnapshot.forEach((doc) => {
      const message = [];
      message.push();
    });
  };
  yobidasi();

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
