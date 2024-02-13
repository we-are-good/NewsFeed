//

import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { auth, db, storage } from "../firebase";
import { doc, updateDoc, deleteDoc, getDoc } from "firebase/firestore";
import GrooveLikeBtn from "../components/Groove/GrooveTotalFeed/GrooveLikeBtn";

import { getDownloadURL, ref, uploadBytes } from "@firebase/storage";

import GrooveHeader from "../components/Groove/GrooveHeader";


function DetailPage() {
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedBody, setEditedBody] = useState("");
  const [originalTitle, setOriginalTitle] = useState("");
  const [originalBody, setOriginalBody] = useState("");

  const detailGroove = location.state.find((item) => item.id === params.id);

  const [isLiked, setIsLiked] = useState(detailGroove?.isLiked || false);
  const [likeCount, setLikeCount] = useState(detailGroove?.likeCount || 0);
  const [clickDisabled, setClickDisabled] = useState(false);
  const [newImage, setNewImage] = useState(null);
  const [imageURL, setImageURL] = useState(detailGroove.imageUrl);
  useEffect(() => {
    const fetchLikeCount = async () => {
      // Firestore에서 해당 Groove의 데이터를 가져오기 위한 문서 참조를 만듭니다.
      const grooveRef = doc(db, "GrooveTop", detailGroove.id);
      const grooveSnap = await getDoc(grooveRef);

      if (grooveSnap.exists()) {
        setLikeCount(grooveSnap.data().likeCount);
      }
    };
    fetchLikeCount();
  }, [detailGroove?.id]);

  useEffect(() => {
    setEditedTitle(detailGroove.title);
    setEditedBody(detailGroove.body);
    setOriginalTitle(detailGroove.title);
    setOriginalBody(detailGroove.body);
  }, [location.state]);

  const toggleLike = async () => {
    try {
      if (clickDisabled) return;
      setClickDisabled(true);

      const grooveRef = doc(db, "GrooveTop", detailGroove.id);

      // Firestore에서 바로 업데이트
      await updateDoc(grooveRef, {
        isLiked: !isLiked,
        likeCount: isLiked ? likeCount - 1 : likeCount + 1
      });

      setIsLiked(!isLiked);
      setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
    } catch (error) {
      console.error("Error toggling like:", error);
    } finally {
      setClickDisabled(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    const askUpdate = window.confirm("정말 수정하시겠습니까?");
    if (!askUpdate) return;

    // 이미지 변경
    if (newImage) {
      // const imageRef = ref(storage, `${auth.currentUser.uid}/${selectedFile.name}`);
      const imageRef = ref(storage, `${auth.uid}/${newImage.name}`);
      await uploadBytes(imageRef, newImage);
      const newImageURL = await getDownloadURL(imageRef);

      const grooveRef = doc(db, "GrooveTop", detailGroove.id);
      await updateDoc(grooveRef, { imageUrl: newImageURL });

      setImageURL(newImageURL);
    }

    const GrooveTopRef = doc(db, "GrooveTop", detailGroove.id);
    await updateDoc(GrooveTopRef, { title: editedTitle, body: editedBody });

    if (editedTitle === originalTitle && editedBody === originalBody && !newImage) {
      setIsEditing(false);
      return alert("수정사항이 없습니다!");
    } else {
      setIsEditing(false);
      alert("수정되었습니다!");
      setOriginalTitle(editedTitle);
      setOriginalBody(editedBody);
    }
  };

  const handleCancel = () => {
    setEditedTitle(originalTitle);
    setEditedBody(originalBody);
    setIsEditing(false);

    setNewImage(null);
    setImageURL(detailGroove.imageUrl);
  };

  const handleDelete = async () => {
    try {
      const askDelete = window.confirm("정말 삭제하시겠습니까?");
      if (!askDelete) return;
      const GrooveTopRef = doc(db, "GrooveTop", detailGroove.id);
      await deleteDoc(GrooveTopRef);
      navigate("/", alert("삭제되었습니다!"));
    } catch (error) {
      console.error("Error deleting groove:", error);
    }
  };

  const handleFileSelect = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setNewImage(file);

    const imageRef = ref(storage, `${auth.uid}/${file.name}`);
    // const imageRef = ref(storage, `${auth.currentUser.uid}/${selectedFile.name}`);
    await uploadBytes(imageRef, file);
    // 새 이미지 URL 가져오기
    const newImageURL = await getDownloadURL(imageRef);
    console.log("newImageURL", newImageURL);
    setImageURL(newImageURL);
  };

  // const handleImageChange = async (selectedFile) => {
  //   const imageRef = ref(storage, `${auth.uid}/${selectedFile.name}`);
  //   // const imageRef = ref(storage, `${auth.currentUser.uid}/${selectedFile.name}`);
  //   await uploadBytes(imageRef, selectedFile);
  //   // 새 이미지 URL 가져오기
  //   const newImageURL = await getDownloadURL(imageRef);
  //   console.log("newImageURL", newImageURL);

  //   // Firestore에 새 이미지 URL 업데이트
  //   const grooveRef = doc(db, "GrooveTop", detailGroove.id);
  //   await updateDoc(grooveRef, { imageUrl: newImageURL });

  //   // State 업데이트
  //   setNewImage(selectedFile);
  //   setImageURL(newImageURL);
  // };
  return (
    <>
      <GrooveHeader />
      <div>DetailPage</div>
      {isEditing ? (
        <>
          <label>제목: </label>
          <input type="text" value={editedTitle} onChange={(e) => setEditedTitle(e.target.value)} />
          <br />
          <label>내용: </label>
          <textarea style={{ resize: "none" }} value={editedBody} onChange={(e) => setEditedBody(e.target.value)} />
          <br />
          <button onClick={handleSave}>저장</button>
          <button onClick={handleCancel}>취소</button>
          <img style={{ width: "200px", height: "200px" }} src={imageURL} alt="미리보기"></img>
          <input type="file" onChange={handleFileSelect} />
          {/* <button onClick={() => handleImageChange(newImage)}>이미지 변경하기</button> */}
          <br />
        </>
      ) : (
        <>
          <>제목: {originalTitle}</>
          <>내용: {originalBody}</>
          {/* 좋아요 버튼 컴포넌트를 렌더링하고, 필요한 props를 전달합니다. */}
          <GrooveLikeBtn isLiked={isLiked} onLikeClick={toggleLike} likeCount={likeCount} grooveId={detailGroove?.id} />
          <br />
          <button onClick={handleEdit}>수정하기</button>
          <br />
          <button onClick={handleDelete}>삭제하기</button>
          <br />
          <button onClick={() => navigate("/")}>홈으로</button>
          <br />
          <img style={{ width: "200px", height: "200px" }} src={imageURL} alt="Groove Image"></img>
          <br />
        </>
      )}
    </>
  );
}

export default DetailPage;