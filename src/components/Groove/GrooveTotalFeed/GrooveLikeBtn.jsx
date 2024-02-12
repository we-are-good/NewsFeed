import React from "react";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../../../firebase";

const GrooveLikeBtn = ({ isLiked, onLikeClick, likeCount, grooveId }) => {
  const toggleLike = async () => {
    // Firestore 업데이트
    const grooveRef = doc(db, "GrooveTop", grooveId);
    await updateDoc(grooveRef, {
      isLiked: !isLiked,
      likeCount: isLiked ? likeCount - 1 : likeCount + 1
    });

    // 부모 컴포넌트에서 좋아요 상태를 업데이트하는 함수 호출
    onLikeClick();
  };

  return (
    <button onClick={toggleLike}>
      {isLiked ? <i className="fa-regular fa-heart"></i> : <i className="fa-solid fa-heart"></i>}
      {likeCount}
    </button>
  );
};

export default GrooveLikeBtn;
