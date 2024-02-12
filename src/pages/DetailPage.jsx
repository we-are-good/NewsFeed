import React from "react";
import { useLocation, useParams } from "react-router-dom";

function DetailPage() {
  const params = useParams();
  const location = useLocation();
  const detailGroove = location.state.filter((item) => item.id === params.id);

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

  // const deleteTodo = async (event) => {
  //   const todoRef = doc(db, "todos", todo.id);
  //   await deleteDoc(todoRef);

  //   setTodos((prev) => {
  //     return prev.filter((element) => element.id !== todo.id);
  //   });
  // };

  return (
    <>
      <div>DetailPage</div>
      <>제목: {detailGroove[0].title}</>
      <>제목: {detailGroove[0].body}</>
    </>
  );
}

export default DetailPage;
