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
import React from "react";

const muiTheme = createTheme({
  palette: {
    primary: {
      main: "#007aff",
    },
  },
});
export const DirectMessage = () => {
  const [chatCtl] = React.useState(new ChatController());

  React.useMemo(async () => {
    // Chat content is displayed using ChatController
    await chatCtl.addMessage({
      type: "text",
      content: `Hello, What's your name.`,
      self: false,
    });
    await chatCtl.addMessage({
      type: "text",
      content: `Hey`,
      self: false,
    });
    const name = await chatCtl.setActionRequest({ type: "text" });
  }, [chatCtl]);

  // <MuiChat chatController={chatCtl} />;

  // Only one component used for display
  return (
    <ThemeProvider theme={muiTheme}>
      <button> aaa</button>
      <MuiChat chatController={chatCtl} />
    </ThemeProvider>
  );
};
