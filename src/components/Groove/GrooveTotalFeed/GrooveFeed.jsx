import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import styled from "styled-components";
const Top = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;
const Feed = styled.div`
  background-color: gray;
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  width: 17%;
  height: 500px;
`;
const Title = styled.div`
  color: green;
`;
const Body = styled.div`
  color: yellow;
`;
const GrooveFeed = ({ todo, setTodos, GrooveTop }) => {
  const updateTodo = async (event) => {
    const todoRef = doc(db, "todos", todo.id);
    await updateDoc(todoRef, { ...todo, isDone: !todo.isDone });

    setTodos((prev) => {
      return prev.map((element) => {
        if (element.id === todo.id) {
          return { ...element, isDone: !element.isDone };
        } else {
          return element;
        }
      });
    });
  };

  const deleteTodo = async (event) => {
    const todoRef = doc(db, "todos", todo.id);
    await deleteDoc(todoRef);

    setTodos((prev) => {
      return prev.filter((element) => element.id !== todo.id);
    });
  };
  
  return (
    // <div key={todo.id}>
    //   <span>{todo.text}</span>
    //   <button onClick={updateTodo}>{todo.isDone ? "취소" : "완료"}</button>
    //   <button onClick={deleteTodo}>삭제</button>
    // </div>
    <>
      <>
        //////////////////////////////////////////////////////////////////////////////////////////피드영역//////////////////////////////////////////////////////////////////////////////////////////
      </>
      <Top>
        {GrooveTop.map((item) => {
          return (
            // 여기서 item은 Firestore Database의 문서!
            <Feed key={item.id}>
              <img src="" alt="업로드된 이미지"></img>
              <Title>제목 :{item.title}</Title>
              <Body>내용 :{item.body}</Body>
            </Feed>
          );
        })}
      </Top>
      <>
        //////////////////////////////////////////////////////////////////////////////////////////피드영역//////////////////////////////////////////////////////////////////////////////////////////
      </>
    </>
  );
};

export default GrooveFeed;
