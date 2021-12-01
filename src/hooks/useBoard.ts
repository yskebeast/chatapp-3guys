import { addDoc, collection, serverTimestamp } from "@firebase/firestore";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { db } from "../firebase";

export const useBoard = () => {
  const loginUser = useSelector(selectUser);

  const [tweet, setTweet] = useState("");

  const handleTweet = async () => {
    if (tweet === "") return;
    const timestamp = serverTimestamp();
    const ref = collection(db, "board");
    await addDoc(ref, {
      tweet: tweet,
      time: timestamp,
      user: loginUser.uid,
      name: loginUser.username,
    });
    setTweet("");
  };
  return {handleTweet, tweet, setTweet}
};
