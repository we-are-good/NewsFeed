import React, { useEffect, useState } from "react";
import GrooveFeed from "./GrooveFeed";
import { addDoc, collection, getDocs, query } from "firebase/firestore";
import { db } from "../../../firebase";

const GrooveFeedList = () => {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");
  // useEffect 안에서 async/await를 만드려면 새로운 함수를 만들어야한다
  useEffect(() => {
    const fetchData = async () => {
      // collection 이름이 todos인 collection의 모든 document를 가져옵니다.
      const q = query(collection(db, "todos"));
      const querySnapshot = await getDocs(q);
      const initialTodos = [];

      // document의 id와 데이터를 initialTodos에 저장합니다.
      // doc.id의 경우 따로 지정하지 않는 한 자동으로 생성되는 id입니다.
      // doc.data()를 실행하면 해당 document의 데이터를 가져올 수 있습니다.
      querySnapshot.forEach((doc) => {
        const data = {
          id: doc.id, // 실제 firebase에서 "문서추가"부분
          ...doc.data()
        };
        console.log("data", data);
        initialTodos.push(data);
      });

      // firestore에서 가져온 데이터를 state에 전달
      setTodos(initialTodos);
    };
    fetchData();
  }, []);

  const onChange = (event) => {
    const {
      target: { name, value }
    } = event;
    if (name === "text") {
      setText(value);
    }
  };

  const addTodo = async (event) => {
    event.preventDefault();
    // Firestore에서 'todos' 컬렉션에 대한 참조 생성하기
    const newTodo = { text: text, isDone: false };

    const collectionRef = collection(db, "todos");
    const { id } = await addDoc(collectionRef, newTodo);

    setTodos((prev) => {
      // 'todos' 컬렉션에 newTodo 문서를 추가합니다.
      return [...todos, { ...newTodo, id }];
    });
    setText("");
  };

  return (
    <div>
      <h2>할 일 컴포넌트</h2>
      <form>
        <div>
          <label>할 일 : </label>
          <input type="text" value={text} name="text" onChange={onChange} required></input>
          <button onClick={addTodo}>추가</button>
        </div>
      </form>
      <h3>Working</h3>
      {todos
        .filter((todo) => !todo.isDone)
        .map((todo) => {
          return <GrooveFeed key={todo.id} todo={todo} setTodos={setTodos} />;
        })}
      <h3>Done</h3>
      {todos
        .filter((todo) => todo.isDone)
        .map((todo) => {
          return <GrooveFeed key={todo.id} todo={todo} setTodos={setTodos} />;
        })}
    </div>
  );
};

export default GrooveFeedList;
