import { Timestamp, addDoc, collection } from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { auth, db, storage } from "../firebase";
import { useNavigate } from "react-router-dom";
import GrooveHeader from "../components/Groove/GrooveHeader";

import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

function WritePage() {
  const focusRef = useRef();
  const navigate = useNavigate();
  const [titleText, setTitleText] = useState("");
  const [bodyText, setBodyText] = useState("");
  const [GrooveTop, setGrooveTop] = useState([]);

  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState();

  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // useEffect(() => {
  //   if (isLoggedIn) {
  //     return;
  //   } else {
  //     alert("로그인이 필요합니다");
  //     navigate("/");
  //   }
  // }, []);

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
    event.preventDefault();
    // Firestore에서 'grooveTop' 컬렉션에 대한 참조 생성하기
    const newGroove = {
      body: titleText,
      title: bodyText,
      Timestamp: new Date(),
      isLiked: false,
      likeCount: 0,
      imageUrl: selectedFile ? imageUrl : ""
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

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async (e) => {
    // 업로드시 제출 막으려고
    e.preventDefault();
    // ref 함수를 이용해서 Storage 내부 저장할 위치를 지정하고, uploadBytes 함수를 이용해서 파일을 저장합니다.
    // const imageRef = ref(storage, `${auth.currentUser.uid}/${selectedFile.name}`);
    const imageRef = ref(storage, `${auth.uid}/${selectedFile.name}`);
    await uploadBytes(imageRef, selectedFile);

    // 파일 URL 가져오기
    const downloadURL = await getDownloadURL(imageRef);
    console.log("downloadURL", downloadURL);
    setImageUrl(downloadURL);
  };
  return (
    <>
      <GrooveHeader />
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
        <button onClick={handleUpload}>Upload</button>
        <img src={imageUrl} alt="기본이미지" style={{ width: "200px", height: "200px" }}></img>
      </form>
    </>
  );
}

export default WritePage;
