import React, { useEffect, useState } from "react";
import GrooveFeed from "./GrooveFeed";
import { addDoc, collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { auth, db } from "../../../firebase";

const GrooveFeedList = () => {
  const [newsCards, setNewsCards] = useState([]);
  // useEffect 안에서 async/await를 만드려면 새로운 함수를 만들어야함
  useEffect(() => {
    const fetchData = async () => {
      // collection 이름이 todos인 collection의 모든 document를 가져옵니다.
      // const q = query(collection(db, "GrooveTop")) 아래코드가 정렬
      const q = query(collection(db, "NewsCards"), orderBy("Timestamp", "desc"));
      const querySnapshot = await getDocs(q);
      const initialNewsCards = [];
      // document의 id와 데이터를 initialNewsCards 저장합니다.
      // doc.id의 경우 따로 지정하지 않는 한 자동으로 생성되는 id입니다.
      // doc.data()를 실행하면 해당 document의 데이터를 가져올 수 있습니다.
      querySnapshot.forEach((doc) => {
        const data = {
          id: doc.id, // 실제 firebase에서 "문서추가"부분
          ...doc.data()
        };
        initialNewsCards.push(data);
      });
      // firestore에서 가져온 데이터를 state에 전달
      setNewsCards(initialNewsCards);
    };
    fetchData();
  }, []);

  return (
    <>
      <GrooveFeed newsCards={newsCards} />
    </>
  );
};

export default GrooveFeedList;
