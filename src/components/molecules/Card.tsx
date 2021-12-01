import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Avatar from "../atoms/avatar/Avatar";
import { collection, query, onSnapshot, doc } from "firebase/firestore";
import { db } from "../../firebase";
import { render } from "@testing-library/react";

export default function ActionAreaCard() {
  const q = query(collection(db, "board"));
  onSnapshot(q, (querySnapshot) => {
    const cities: any = []; //citiesを配列で宣言
    querySnapshot.forEach((doc) => {
      //この関数が値を取得する関数になっている。
      console.log("関数起動");
      console.log(doc.data().name);
      console.log("関数起動");
    });
    console.log("Current cities in CA: ", cities.join(", "));
  });

  return (
    <Card sx={{ maxWidth: 250 }}>
      <Avatar />
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div"></Typography>
          <Typography variant="body2" color="text.secondary"></Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
