import React, { useState } from "react";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../../../firebase";

const GrooveLikeBtn = ({ initialIsLiked, onLikeClick, likeCount, grooveId }) => {
  const [isLiked, setIsLiked] = useState(initialIsLiked);

  const toggleLike = async () => {
    // Firestore 업데이트
    const grooveRef = doc(db, "GrooveTop", grooveId);
    await updateDoc(grooveRef, {
      isLiked: !isLiked,
      likeCount: isLiked ? likeCount - 1 : likeCount + 1
    });

    // 부모 컴포넌트에서 좋아요 상태를 업데이트하는 함수 호출
    onLikeClick();

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
