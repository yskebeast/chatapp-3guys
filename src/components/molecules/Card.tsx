import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Avatar from "../atoms/avatar/Avatar";
import { collection, query, where, onSnapshot, doc } from "firebase/firestore";
import { db } from "../../firebase";
import { render } from "@testing-library/react";

export default function ActionAreaCard() {
  //   const q = query(collection(db, "board"));
  //   onSnapshot(q, (querySnapshot) => {
  //     const cities: any = []; //citiesを配列で宣言
  //     querySnapshot.foEach((doc) => {
  //       //この関数が値を取得する関数になっている。
  //       cities.push(doc.data());
  //       console.log("関数起動");
  //       console.log(doc.data());
  //       console.log(doc.data().name);
  //       console.log("関数起動");
  //     });
  //     console.log("Current cities in CA: ", cities.join(", "));
  //   });

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

// class Square extends React.Component {
//   render() {
//     return <button className="square">{this.props.value}</button>;
//   }
// }

// class Board extends React.Component {
//   renderSquare(i) {
//     return <Square value={i} />; //ポイント1
//   }

//   render() {
//     return (
//       <div>
//         <div className="status">{status}</div>
//         <div className="board-row">
//           {this.renderSquare(0)}
//           {this.renderSquare(1)}
//           {this.renderSquare(2)}
//         </div>
//         <div className="board-row">
//           {this.renderSquare(3)}
//           {this.renderSquare(4)}
//           {this.renderSquare(5)}
//         </div>
//         <div className="board-row">
//           {this.renderSquare(6)}
//           {this.renderSquare(7)}
//           {this.renderSquare(8)}
//         </div>
//       </div>
//     );
//   }
// }
