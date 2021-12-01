import * as React from "react";
import { useState } from "react";
import ImageList from "@mui/material/ImageList";
// import ImageListItem from "@mui/material/ImageListItem";
// import ImageListItemBar from "@mui/material/ImageListItemBar";
import Card from "../molecules/Card";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../../firebase";

export const UserList = () => {
  var namedata: any = [];
  let r;
  r = 0;
  const [itemData, setitemData] = useState<any>([
    {
      img: "",
      name: "",
    },
  ]);

  const q = query(collection(db, "board"));

  //1.ユーザーを取得する。currenUser nullを指定。2.取得したユーザーを変数に代入。3.取得したユーザーの数だけ配列を宣言。4.forで取得したユーザー数分だけ回しながら、配列に代入。

  onSnapshot(q, (querySnapshot) => {
    const cities: any = []; //citiesを配列で宣言
    querySnapshot.forEach((doc) => {
      // この関数が値を取得する関数になっている。
      // itemData["title"].push(doc.data().name);
      setitemData({ img: doc.data().img, name: doc.data() });

      console.log("関数起動");
      console.log(doc.data().name);
      // let length1 = Object.keys(namedata).length;
    });
  });
  console.log(itemData);
  return (
    <ImageList sx={{ mx: "auto", width: 1000 }} cols={3}>
      {itemData.map((item: any) => {
        // return console.log(item.title);
        return <Card />;
      })}

      {/* home.tsx内のスライスからデータを取れるやつがあるので、取得すればいい。 */}
      {/* userに変化があったらdispatchで変更、firebaseで更新。 */}
      {/* 複数のドキュメント取得→get clickしたらcollectionのdb,"users"を選択　getodocksをしたら変数の前ドキュメントを取得するfor */}

      {/* {itemData.map((item) => (
        <ImageListItem key={item.img}>
          <img
            src={`${item.img}?w=248&fit=crop&auto=format`}
            srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
            alt={item.title}
            loading="lazy"
          />
          <ImageListItemBar title={item.title} position="below" />
        </ImageListItem>
      ))} */}
    </ImageList>
  );
};

// userのドキュメントを取得
