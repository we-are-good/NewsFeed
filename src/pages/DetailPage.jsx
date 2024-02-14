import {
  EditingTitle,
  DetailFileBox,
  Wrap,
  Title,
  Body,
  EditingWrap,
  EditingButtonWrap,
  HomeBtn,
  EditingBody,
  LikeWrap,
  NoneLoggedLike
} from "../style/GrooveDetailStyle";
import { FileBox, Input, FormTitle, FormBody, TextArea } from "../style/GrooveWriteStyle";
import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { app, auth, db, storage } from "../firebase";
import { doc, updateDoc, deleteDoc, getDoc, getFirestore, collection, getDocs } from "firebase/firestore";
import GrooveLikeBtn from "../components/Groove/GrooveTotalFeed/GrooveLikeBtn";
import GrooveAuth from "../components/Groove/GrooveAuth";
import { getDownloadURL, ref, uploadBytes } from "@firebase/storage";
import defaultImage from "../assets/defaultImage.jpg";
import GrooveHeader from "../components/Groove/GrooveHeader";
import GrooveFooter from "../components/Groove/GrooveFooter";

function DetailPage({
  currentUser,
  isUserLogIn,
  setIsUserLogIn,
  isMyIconClicked,
  setIsMyIconClicked,
  setTotalUsersInformation,
  logInModal,
  setLogInModal,
  nickname,
  setNickname
}) {
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedBody, setEditedBody] = useState("");
  const [originalTitle, setOriginalTitle] = useState("");
  const [originalBody, setOriginalBody] = useState("");
  const [user, setUser] = useState(null);

  const detailGroove = location.state.find((item) => item.id === params.id);

  const [isLiked, setIsLiked] = useState(false); // 좋아요 상태를 각 사용자 별로 따로 관리
  const [likeCount, setLikeCount] = useState(detailGroove?.likeCount || 0);
  const [likes, setLikes] = useState(detailGroove?.likes || {}); // 사용자의 좋아요 상태를 기록하는 객체
  const [clickDisabled, setClickDisabled] = useState(false);
  const [newImage, setNewImage] = useState(null);
  const [imageURL, setImageURL] = useState(detailGroove.imageUrl);
  const [loginData, setLoginData] = useState([]);
  useEffect(() => {
    const fetchLoginData = async () => {
      try {
        const db = getFirestore(app);
        const loginDataCollection = collection(db, "logInData");
        const snapshot = await getDocs(loginDataCollection);
        const loginDataArray = [];

        snapshot.forEach((doc) => {
          const data = doc.data();
          loginDataArray.push({
            id: doc.id,
            email: data.email,
            nickname: data.nickname
          });
        });
        setLoginData(loginDataArray);
      } catch (error) {
        console.error("Error fetching loginData:", error);
      }
    };
    fetchLoginData();
  }, []);

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
    // 작성자와 로그인한 사용자가 동일한 경우에만 수정 가능하도록 체크
    if (!user || user.uid !== detailGroove.authorId) {
      alert("글 작성자만 수정할 수 있습니다.");
      return;
    }

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

      if (
        //수정된 제목이 원본 제목과 동일하고, 수정된 내용이 원본 내용과 동일하며, 새 이미지가 없는 경우
        (editedTitle === originalTitle && editedBody === originalBody && !newImage) ||
        // 제목이 공백인경우
        editedTitle.trim() === "" ||
        // 내용이 공백인경우
        editedBody.trim() === ""
      ) {
        return alert("수정할 내용이 없거나 제목 또는 내용이 빈칸입니다!");
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
    // 이미지 업로드 전에 setImageURL 호출
    setImageURL(newImageURL);
  };
  const userLoginData = loginData.find((loginItem) => loginItem.email === detailGroove.email);

  return (
    <Wrapper>
      <GrooveHeader
        nickname={nickname}
        setNickname={setNickname}
        currentUser={currentUser}
        isUserLogIn={isUserLogIn}
        setIsUserLogIn={setIsUserLogIn}
        isMyIconClicked={isMyIconClicked}
        setIsMyIconClicked={setIsMyIconClicked}
        setTotalUsersInformation={setTotalUsersInformation}
        logInModal={logInModal}
        setLogInModal={setLogInModal}
      />
      {isEditing ? (
        <EditingWrap>
          {imageURL ? (
            <img src={imageURL} alt="이미지 미리보기"></img>
          ) : (
            <img src={defaultImage} alt="기본 이미지"></img>
          )}
          <FileBox>
            <label for="ex_file">이미지 업로드</label>
            <Input type="file" id="ex_file" onChange={handleFileSelect} />
          </FileBox>

          <FormTitle>
            <input type="text" maxLength={"100"} value={editedTitle} onChange={(e) => setEditedTitle(e.target.value)} />
          </FormTitle>

          <FormBody>
            <TextArea
              type="text"
              maxLength={"100"}
              value={editedBody}
              onChange={(e) => setEditedBody(e.target.value)}
            />
          </FormBody>
          <EditingButtonWrap>
            <span>*제목과 내용은 100글자 이내로 작성하야 합니다.</span>
            <button onClick={handleSave}>수정 완료</button>
            <button onClick={handleCancel}>취소</button>
          </EditingButtonWrap>

          {/* <button onClick={() => handleImageChange(newImage)}>이미지 변경하기</button> */}
          <br />
        </EditingWrap>
      ) : (
        <Wrap>
          {imageURL ? <img src={imageURL} alt="Groove Image"></img> : <img src={defaultImage} alt="기본 이미지"></img>}
          {/* <img style={{ width: "400px", height: "400px" }} src={imageURL} alt="Groove Image"></img> */}
          <Title>제목: {originalTitle}</Title>
          <Body>내용: {originalBody}</Body>
          {/* 좋아요 버튼 컴포넌트를 렌더링하고, 필요한 props를 전달합니다. */}
          {user ? (
            // 로그인 상태일 때만 좋아요 버튼을 활성화

            <LikeWrap>
              {/* {userLoginData.nickname}으로 하려했으나 실패 */}
              <span>작성자 : {userLoginData?.nickname}</span>
              <p>좋아요 : {Object.keys(likes).length}개</p>
              <GrooveLikeBtn isLiked={isLiked} onLikeClick={toggleLike} grooveId={detailGroove?.id} />
            </LikeWrap>
          ) : (
            // 로그인 상태가 아닐 때 로그인을 유도하는 메시지 또는 경고창 표시
            <>
              <NoneLoggedLike>
                {/* {userLoginData.nickname}으로 하려했으나 실패 */}
                {userLoginData?.nickname}
                <p>좋아요: {Object.keys(likes).length}개</p>
                <p>로그인 후에 좋아요를 누르실 수 있습니다.</p>
              </NoneLoggedLike>
              <GrooveAuth
                nickname={nickname}
                setNickname={setNickname}
                currentUser={currentUser}
                setTotalUsersInformation={setTotalUsersInformation}
                logInModal={logInModal}
                setLogInModal={setLogInModal}
                setIsUserLogIn={setIsUserLogIn}
              />
            </>
          )}
          <br />
          {/* 작성자와 로그인한 사용자가 동일한 경우에만 수정, 삭제 버튼 노출 */}
          {user && user.uid === detailGroove.authorId && (
            <>
              <button onClick={handleEdit}>수정하기</button>
              <button onClick={handleDelete}>삭제하기</button>
            </>
          )}

          <HomeBtn onClick={() => navigate("/")}></HomeBtn>
        </Wrap>
      )}
      <GrooveFooter />
    </Wrapper>
  );
}

export default DetailPage;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;
