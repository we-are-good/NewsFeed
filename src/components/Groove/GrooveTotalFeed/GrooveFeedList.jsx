import React, { useEffect, useState } from "react";
import GrooveFeed from "./GrooveFeed";
import { addDoc, collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../../../firebase";

const GrooveFeedList = () => {
  const [GrooveTop, setGrooveTop] = useState([]);

  const [titleText, setTitleText] = useState("");
  const [bodyText, setBodyText] = useState("");

  // console.log("GrooveTop", GrooveTop);
  // console.log("titleText", titleText);
  // console.log("bodyText", bodyText);
  // useEffect 안에서 async/await를 만드려면 새로운 함수를 만들어야함
  useEffect(() => {
    const fetchData = async () => {
      // collection 이름이 todos인 collection의 모든 document를 가져옵니다.
      // const q = query(collection(db, "GrooveTop")) 아래코드가 정렬
      const q = query(collection(db, "GrooveTop"), orderBy("Timestamp", "desc"));

      const querySnapshot = await getDocs(q);
      const initialGrooveTop = [];

      // document의 id와 데이터를 initialGrooveTop 저장합니다.
      // doc.id의 경우 따로 지정하지 않는 한 자동으로 생성되는 id입니다.
      // doc.data()를 실행하면 해당 document의 데이터를 가져올 수 있습니다.
      querySnapshot.forEach((doc) => {
        const data = {
          id: doc.id, // 실제 firebase에서 "문서추가"부분
          ...doc.data()
        };
        // console.log("data", data);
        initialGrooveTop.push(data);
      });

      // firestore에서 가져온 데이터를 state에 전달
      setGrooveTop(initialGrooveTop);
    };
    fetchData();
  }, []);

  // const onChangeTitle = (event) => {
  //   const {
  //     target: { name, value }
  //   } = event;
  //   if (name === "titleText") {
  //     setTitleText(value);
  //   }
  // };

  // const onChangeBody = (event) => {
  //   const {
  //     target: { name, value }
  //   } = event;
  //   if (name === "bodyText") {
  //     setBodyText(value);
  //   }
  // };

  // const addTodo = async (event) => {
  //   event.preventDefault();

  //   // Firestore에서 'newGroove' 컬렉션에 대한 참조 생성하기
  //   const newGroove = { body: titleText, title: bodyText };

  //   // const newTodo = { text: text, isDone: false };

  //   const collectionRef = collection(db, "GrooveTop");
  //   const { id } = await addDoc(collectionRef, newGroove);

  //   setGrooveTop((prev) => {
  //     // 'GrooveTop' 컬렉션에 newTodo 문서를 추가합니다.
  //     return [...GrooveTop, { ...newGroove, id }];
  //   });
  // };

  return (
    <>
      <GrooveFeed GrooveTop={GrooveTop} />
    </>
  );
};

export default GrooveFeedList;
