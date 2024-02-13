import { Timestamp, addDoc, collection } from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { auth, db, storage } from "../firebase";
import { useNavigate } from "react-router-dom";
import GrooveHeader from "../components/Groove/GrooveHeader";

import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

function WritePage({ currentUser }) {
  const focusRef = useRef();
  const navigate = useNavigate();
  const [titleText, setTitleText] = useState("");
  const [bodyText, setBodyText] = useState("");
  const [GrooveTop, setGrooveTop] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState();

  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(currentUser);
  useEffect(() => {
    console.log("currentUser", currentUser);
    if (isLoggedIn) {
      return;
    } else {
      alert("로그인이 필요합니다");
      navigate("/");
    }
  }, []);

  useEffect(() => {
    focusRef.current.focus();
  }, []);

  const onChangeTitle = (event) => {
    event.preventDefault();
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
    console.log(currentUser);
    event.preventDefault();
    // Firestore에서 'grooveTop' 컬렉션에 대한 참조 생성하기
    const newGroove = {
      body: bodyText,
      title: titleText,
      Timestamp: new Date(),
      isLiked: false,
      likeCount: 0,
      imageUrl: selectedFile ? imageUrl : "",
      authorId: currentUser.uid
    };
    if (titleText.length === 0 && bodyText.length === 0) {
      alert("제목과 내용은 필수 입력입니다");
      return;
    }
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

  const handleFileSelect = async (event) => {
    const file = event.target.files[0];
    setSelectedFile(event.target.files[0]);

    // ref 함수를 이용해서 Storage 내부 저장할 위치를 지정하고, uploadBytes 함수를 이용해서 파일을 저장합니다.
    // const imageRef = ref(storage, `${auth.currentUser.uid}/${selectedFile.name}`);
    const imageRef = ref(storage, `${auth.uid}/${file.name}`);
    await uploadBytes(imageRef, file);

    // 다운로드 URL 가져오기
    const downloadURL = await getDownloadURL(imageRef);
    console.log("downloadURL", downloadURL);
    setImageUrl(downloadURL);
  };

  return (
    <>
      <GrooveHeader currentUser={currentUser} />
      <form>
        <label> 글 작성 </label>
        <br />
        제목:
        <input type="text" value={titleText} name="titleText" onChange={onChangeTitle} ref={focusRef} required></input>
        <br />
        내용:<input type="text" value={bodyText} name="bodyText" onChange={onChangeBody} required></input>
        <br />
        <button onClick={addTodo}>추가</button>
        <button onClick={() => navigate("/")}>취소</button>
        <input type="file" onChange={handleFileSelect} />
        <img src={imageUrl} alt="기본이미지" style={{ width: "200px", height: "200px" }}></img>
      </form>
    </>
  );
}

export default WritePage;
