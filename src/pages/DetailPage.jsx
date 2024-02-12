import { deleteDoc, doc } from "firebase/firestore";
import React from "react";
import { useLocation, useParams } from "react-router-dom";
import { db } from "../firebase";

function DetailPage({ setGrooveTop, GrooveTop }) {
  const params = useParams();
  const location = useLocation();
  const detailGroove = location.state.filter((item) => item.id === params.id);
  console.log(...detailGroove);
  // const updateTodo = async (event) => {
  //   const todoRef = doc(db, "todos", todo.id);
  //   await updateDoc(todoRef, { ...todo, isDone: !todo.isDone });

  //   setTodos((prev) => {
  //     return prev.map((element) => {
  //       if (element.id === todo.id) {
  //         return { ...element, isDone: !element.isDone };
  //       } else {
  //         return element;
  //       }
  //     });
  //   });
  // };

  const deleteGroove = async (event) => {
    const GrooveTopRef = doc(db, "GrooveTop", GrooveTop.id);
    console.log(GrooveTopRef);
    await deleteDoc(GrooveTopRef);

    setGrooveTop((prev) => {
      console.log(prev);
      return prev.filter((element) => element.id !== GrooveTop.id);
    });
  };

  return (
    <>
      <div>DetailPage</div>
      <>제목: {detailGroove[0].title}</>
      <>내용: {detailGroove[0].body}</>
      <button onClick={deleteGroove}>삭제하기</button>
    </>
  );
}

export default DetailPage;
