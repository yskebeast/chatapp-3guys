import * as React from "react";
import ImageList from "@mui/material/ImageList";
// import ImageListItem from "@mui/material/ImageListItem";
// import ImageListItemBar from "@mui/material/ImageListItemBar";
import Card from "../molecules/Card";

export default function TitlebarBelowImageList() {
  return (
    <ImageList sx={{ mx: "auto", width: 1000 }} cols={3}>
      {itemData.map((item) => {
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
}

const itemData = [
  {
    img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
    title: "ooba",
  },
  {
    img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
    title: "kakehi",
  },
  {
    img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
    title: "tani",
  },
  {
    img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
    title: "munakata",
  },
];
