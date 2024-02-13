import React, { useState, useEffect } from "react";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../../../firebase";

const GrooveLikeBtn = ({ initialIsLiked, onLikeClick, likeCount, grooveId }) => {
  const [isLiked, setIsLiked] = useState(initialIsLiked);

  // localStorage에서 좋아요 상태를 불러오기
  useEffect(() => {
    const storedIsLiked = localStorage.getItem(`like-${grooveId}`);
    if (storedIsLiked !== null) {
      setIsLiked(JSON.parse(storedIsLiked));
    }
  }, [grooveId]);

  const toggleLike = async () => {
    // Firestore 업데이트
    const grooveRef = doc(db, "GrooveTop", grooveId);
    await updateDoc(grooveRef, {
      isLiked: !isLiked,
      likeCount: isLiked ? likeCount - 1 : likeCount + 1
    });

    // 부모 컴포넌트에서 좋아요 상태를 업데이트하는 함수 호출
    onLikeClick();

    // localStorage에 좋아요 상태 저장
    localStorage.setItem(`like-${grooveId}`, JSON.stringify(!isLiked));

    // 로컬 상태 업데이트
    setIsLiked(!isLiked);
  };

  return (
    <button onClick={toggleLike}>
      {isLiked ? <i className="fa-solid fa-heart" /> : <i className="fa-regular fa-heart" />}
      {likeCount}
    </button>
  );
};

export default React.memo(GrooveLikeBtn);
