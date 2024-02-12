import { deleteDoc, doc } from "firebase/firestore";
import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { db } from "../firebase";

function DetailPage() {
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();
  const detailGroove = location.state.find((item) => item.id === params.id);
  console.log("location", location);
  console.log(detailGroove);
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
  const deleteGroove = async () => {
    try {
      const askDelete = window.confirm("정말 삭제하시겠습니까?");
      if (!askDelete) return;
      const GrooveTopRef = doc(db, "GrooveTop", detailGroove.id);
      console.log("GrooveTopRef:", GrooveTopRef); // 추가된 로그
      await deleteDoc(GrooveTopRef, alert("삭제되었습니다"));
      navigate("/");
    } catch (error) {
      console.error("Error deleting groove:", error);
    }
  };

  return (
    <>
      <div>DetailPage</div>
      <>제목: {detailGroove.title}</>
      <>내용: {detailGroove.body}</>
      <button onClick={deleteGroove}>삭제하기</button>
    </>
  );
}

export default DetailPage;
