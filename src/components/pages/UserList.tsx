import * as React from "react";
import { useState } from "react";
import ImageList from "@mui/material/ImageList";
import Card from "../molecules/Card";

import { useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import Header from "../organisms/Header";
import { db } from "../../firebase";
import "./UserList.css";

type itemType = {
  img: string;
  name: string;
};


export const UserList = () => {
  const itemData: itemType[] = [];
  const [data, setData] = useState<itemType[]>();


  React.useEffect(() => {
    const yobidasi = async () => {
      const querySnapshot = await getDocs(collection(db, "users"));
      querySnapshot.forEach((doc) => {
        itemData.push({ img: doc.data().selfIntro, name: doc.data().name });
      });
      setData(itemData);
    };
    yobidasi();
  }, []);

  const [loading, setLoading] = useState(true);
  React.useEffect(() => {
    if (itemData !== undefined) {
      setLoading(false);
    }
  }, [itemData]);
  return (
    <div className="UserList__main">
      <Header />
      {loading ? (
        <p>naiyo</p>
      ) : (
        <ImageList
          className="UserList__ImageList"
          sx={{ mx: "auto", width: 1000 }}
          cols={3}
        >
          {data !== undefined &&
            data.map((item) => {
              const { img, name } = item;
              return (
                <>
                  <Card img={img} name={name} />
                </>
              );
            })}
        </ImageList>
      )}
    </div>
  );
};

