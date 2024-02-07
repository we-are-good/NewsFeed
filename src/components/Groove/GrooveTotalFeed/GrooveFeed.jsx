import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase";

const GrooveFeed = ({ todo, setTodos }) => {
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
    <div key={todo.id}>
      <span>{todo.text}</span>
      <button onClick={updateTodo}>{todo.isDone ? "취소" : "완료"}</button>
      <button onClick={deleteTodo}>삭제</button>
    </div>
  );
};

export default GrooveFeed;
