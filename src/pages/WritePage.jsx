import { Timestamp, addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";

function WritePage() {
  const navigate = useNavigate();
  const [titleText, setTitleText] = useState("");
  const [bodyText, setBodyText] = useState("");
  const [GrooveTop, setGrooveTop] = useState([]);

  const onChangeTitle = (event) => {
    const {
      target: { name, value }
    } = event;
    if (name === "titleText") {
      setTitleText(value);
    }
  };

  const onChangeBody = (event) => {
    const {
      target: { name, value }
    } = event;
    if (name === "bodyText") {
      setBodyText(value);
    }
  };

  const addTodo = async (event) => {
    event.preventDefault();

    // Firestore에서 'grooveTop' 컬렉션에 대한 참조 생성하기
    const newGroove = { body: titleText, title: bodyText, Timestamp: new Date(), isLiked: false, likeCount: 0 };

    // const newTodo = { text: text, isDone: false };

    const collectionRef = collection(db, "GrooveTop");
    // 여기서 id는  firebase database -> grooveTop컬렉션의 문서값
    const { id } = await addDoc(collectionRef, newGroove);
    console.log("id", id);

    setGrooveTop((prev) => {
      // 'GrooveTop' 컬렉션에 newTodo 문서를 추가합니다.
      return [...GrooveTop, { ...newGroove, id }];
    });
    alert("글 작성이 완료됐습니다.");
    navigate("/");
  };
  return (
    <>
      <div>WritePage</div>

      <form>
        <label> 글 작성 </label>
        <br />
        제목:<input type="text" value={titleText} name="titleText" onChange={onChangeTitle} required></input>
        <br />
        내용:<input type="text" value={bodyText} name="bodyText" onChange={onChangeBody} required></input>
        <br />
        <button onClick={addTodo}>추가</button>
      </form>
    </>
  );
}

export default WritePage;
