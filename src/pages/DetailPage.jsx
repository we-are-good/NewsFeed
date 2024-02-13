import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { auth, db, storage } from "../firebase";
import { doc, updateDoc, deleteDoc, getDoc } from "firebase/firestore";
import GrooveLikeBtn from "../components/Groove/GrooveTotalFeed/GrooveLikeBtn";
import GrooveAuth from "../components/Groove/GrooveAuth";

import { getDownloadURL, ref, uploadBytes } from "@firebase/storage";

import GrooveHeader from "../components/Groove/GrooveHeader";

function DetailPage({
  currentUser,
  isUserLogIn,
  setIsUserLogIn,
  isMyIconClicked,
  setIsMyIconClicked,
  setTotalUsersInformation,
  logInModal,
  setLogInModal
}) {
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedBody, setEditedBody] = useState("");
  const [originalTitle, setOriginalTitle] = useState("");
  const [originalBody, setOriginalBody] = useState("");
  const [user, setUser] = useState(null); // 사용자 상태 추가

  const detailGroove = location.state.find((item) => item.id === params.id);

  const [isLiked, setIsLiked] = useState(false); // 좋아요 상태를 각 사용자 별로 따로 관리
  const [likeCount, setLikeCount] = useState(detailGroove?.likeCount || 0);
  const [likes, setLikes] = useState(detailGroove?.likes || {}); // 사용자의 좋아요 상태를 기록하는 객체
  const [clickDisabled, setClickDisabled] = useState(false);
  const [newImage, setNewImage] = useState(null);
  const [imageURL, setImageURL] = useState(detailGroove.imageUrl);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user); // 현재 사용자 업데이트
    });

    return () => {
      unsubscribe(); // cleanup 함수
    };
  }, []); // 빈 배열을 전달하여 컴포넌트가 처음 마운트될 때만 실행

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
  }, [location.state, detailGroove]);

  const toggleLike = async () => {
    try {
      if (clickDisabled) return;

      // 로그인 상태 확인
      if (!user) {
        // 로그인되지 않았을 때 로그인을 유도하는 메시지 또는 경고창 표시
        alert("로그인 후에 좋아요를 누르실 수 있습니다.");
        return;
      }

      setClickDisabled(true);

      // 사용자의 UID
      const userUid = user.uid;

      // 사용자가 이미 좋아요를 눌렀는지 확인
      const userLiked = likes[userUid];

      // Firestore에서 해당 Groove의 데이터를 가져오기 위한 문서 참조를 만듭니다.
      const grooveRef = doc(db, "GrooveTop", detailGroove.id);

      // 사용자가 이미 좋아요를 눌렀다면 취소, 아니면 좋아요 추가
      if (userLiked) {
        // 좋아요 취소
        delete likes[userUid];
      } else {
        // 좋아요 추가
        likes[userUid] = true;
      }

      // 좋아요 상태 업데이트
      setLikes({ ...likes });

      // 좋아요 개수 업데이트
      setLikeCount(Object.keys(likes).length);

      // Firestore에 좋아요 정보 업데이트
      await updateDoc(grooveRef, { likes });
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
    try {
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
        // 이미지가 변경되었을 때만 setImageUrl 호출
        setImageURL(newImageURL);
      }

      const GrooveTopRef = doc(db, "GrooveTop", detailGroove.id);

      if (editedTitle === originalTitle && editedBody === originalBody && !newImage) {
        return alert("수정사항이 없습니다!");
      } else {
        await updateDoc(GrooveTopRef, { title: editedTitle, body: editedBody });
        setIsEditing(false);
        alert("수정되었습니다!");
        setOriginalTitle(editedTitle);
        setOriginalBody(editedBody);
      }
    } catch (error) {
      alert("에러발생");
      console.error("Error updating groove:", error);
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
      navigate("/");
      alert("삭제되었습니다!");
    } catch (error) {
      alert("에러발생");
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
    // 이미지 업로드 전에 setImageURL 호출
    setImageURL(newImageURL);
  };

  return (
    <>
      <GrooveHeader
        currentUser={currentUser}
        isUserLogIn={isUserLogIn}
        setIsUserLogIn={setIsUserLogIn}
        isMyIconClicked={isMyIconClicked}
        setIsMyIconClicked={setIsMyIconClicked}
        setTotalUsersInformation={setTotalUsersInformation}
        logInModal={logInModal}
        setLogInModal={setLogInModal}
      />
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
          {user ? (
            // 로그인 상태일 때만 좋아요 버튼을 활성화
            <>
              <GrooveLikeBtn isLiked={isLiked} onLikeClick={toggleLike} grooveId={detailGroove?.id} />
              <p>좋아요: {Object.keys(likes).length}개</p>
            </>
          ) : (
            // 로그인 상태가 아닐 때 로그인을 유도하는 메시지 또는 경고창 표시
            <>
              <p>좋아요: {Object.keys(likes).length}개</p>
              <p>로그인 후에 좋아요를 누르실 수 있습니다.</p>
              <GrooveAuth />
            </>
          )}
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
