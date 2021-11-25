import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Avatar from "../atoms/avatar/Avatar";

export default function ActionAreaCard() {
  return (
    <Card sx={{ maxWidth: 250 }}>
      <Avatar />
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            ここに名前を挿入したい
          </Typography>
          <Typography variant="body2" color="text.secondary">
            自己紹介とかを挿入したい
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

// props
