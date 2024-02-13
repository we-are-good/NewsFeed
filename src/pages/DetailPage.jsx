import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { db } from "../firebase";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";

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

  useEffect(() => {
    setEditedTitle(detailGroove.title);
    setEditedBody(detailGroove.body);
    setOriginalTitle(detailGroove.title);
    setOriginalBody(detailGroove.body);
  }, [location.state]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const askUpdate = window.confirm("정말 수정하시겠습니까?");
      if (!askUpdate) return;
      const GrooveTopRef = doc(db, "GrooveTop", detailGroove.id);
      await updateDoc(GrooveTopRef, { title: editedTitle, body: editedBody });
      if (editedTitle === originalTitle && editedBody === originalBody) {
        return alert("수정사항이 없습니다!");
      }
      setIsEditing(false, alert("수정되었습니다!"));
      setOriginalTitle(editedTitle);
      setOriginalBody(editedBody);
    } catch (error) {
      console.error("Error updating groove:", error);
    }
  };

  const handleCancel = () => {
    setEditedTitle(originalTitle);
    setEditedBody(originalBody);
    setIsEditing(false);
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

  return (
    <>
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
        </>
      ) : (
        <>
          <>제목: {originalTitle}</>
          <>내용: {originalBody}</>
          <br />
          <button onClick={handleEdit}>수정하기</button>
          <br />
          <button onClick={handleDelete}>삭제하기</button>
          <br />
          <button onClick={() => navigate("/")}>홈으로</button>
        </>
      )}
    </>
  );
}

export default DetailPage;
