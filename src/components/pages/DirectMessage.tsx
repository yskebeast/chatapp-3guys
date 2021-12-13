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
import { doc, onSnapshot } from "firebase/firestore";
import React from "react";
import { db } from "../../firebase";
import "./DirectMessage.css";

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

  const ExitingTextOutput = async () => {
    const unsub = onSnapshot(doc(db, "chatroom", ""), (doc) => {
      const source = doc.metadata.hasPendingWrites ? "Local" : "Server";
      console.log(source, " data: ", doc.data());
    });
    await chatCtl.addMessage({
      type: "text",
      content: `Hello, What's your name.`,
      self: false,
    });
  };

  React.useMemo(async () => {
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
        // ここから値を送る！
      }
    );

    console.log();
  }, [chatCtl]);

  // <MuiChat chatController={chatCtl} />;

  // Only one component used for display
  return (
    <div className="DirectMessage__feild">
      <ThemeProvider theme={muiTheme}>
        <button> aaa</button>
        <div className="DirectMessage__Muichat">
          <MuiChat chatController={chatCtl} />
        </div>
      </ThemeProvider>
    </div>
  );
};
