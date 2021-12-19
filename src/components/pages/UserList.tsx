import * as React from "react";
import { useState } from "react";
import ImageList from "@mui/material/ImageList";
import Card from "../molecules/Card";
import { collection, getDocs } from "firebase/firestore";
import Header from "../organisms/Header";
import { db } from "../../firebase";
import "./UserList.css";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import { useParams } from "react-router-dom";

type itemType = {
  UserDocumentId: string;
  img: string;
  name: string;
};

export const UserList = () => {
  const itemData: itemType[] = [];
  const [data, setData] = useState<itemType[]>();
  const loginUser = useSelector(selectUser);
  const [loadingUser, setLoadingUser] = useState(true);
  let UserDocumentId: string;

  // ________________
  const pageId: any = useParams();
  console.log(pageId);
  // ________________

  console.log("loginUserは：" + loginUser.uid + "ーーーーーー");
  React.useEffect(() => {
    const yobidasi = async () => {
      const querySnapshot = await getDocs(collection(db, "users"));
      querySnapshot.forEach((doc) => {
        if (doc.data().name === loginUser.uid) {
          console.log("大場春希");
        } else {
          console.log("a");
          // UserDocumentId = doc.id;
          itemData.push({
            UserDocumentId: doc.id,
            img: doc.data().selfIntro,
            name: doc.data().name,
          });
        }
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
              const { UserDocumentId, img, name } = item;
              return (
                <>
                  <Card UserDocumentId={UserDocumentId} img={img} name={name} />
                </>
              );
            })}
        </ImageList>
      )}
    </div>
  );
};
