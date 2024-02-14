import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { auth, db } from "../firebase";
import { collection, query, where, getDocs, getFirestore, doc, updateDoc } from "firebase/firestore";
import GrooveHeader from "../components/Groove/GrooveHeader";
import GrooveFooter from "../components/Groove/GrooveFooter";
import styled from "styled-components";
import { format } from "date-fns";

function MyPage({
  currentUser,
  setCurrentUser,
  isUserLogIn,
  setIsUserLogIn,
  isMyIconClicked,
  setIsMyIconClicked,
  setTotalUsersInformation,
  logInModal,
  setLogInModal,
  nickname,
  setNickname,
  nicknameModal,
  setNicknameModal,
  onNicknameChange
}) {
  const [userEmail, setUserEmail] = useState("");
  const [userUid, setUserUid] = useState("");
  const [userDocId, setUserDocId] = useState("");
  const [userPosts, setUserPosts] = useState([]);
  const [newNickname, setNewNickname] = useState("");
  const [editingNickname, setEditingNickname] = useState(false);
  const [profileImageUrl, setProfileImageUrl] = useState(""); // 프로필 이미지 URL 추가

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setCurrentUser(user);
        setUserEmail(user.email);
        setUserUid(user.uid);
        fetchData(user.email);
        fetchUserPosts(user.uid);
      } else {
        setCurrentUser(null);
        setNickname("");
        setUserEmail("");
        setUserUid("");
        setUserDocId("");
        setUserPosts([]);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const db = getFirestore();
  const fetchData = async (email) => {
    try {
      const q = query(collection(db, "logInData"), where("email", "==", email));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const userData = doc.data();
        const nickname = userData.nickname;
        const profileImage = userData.profileImage; // 프로필 이미지 URL 가져오기
        setNickname(nickname);
        setProfileImageUrl(profileImage); // 프로필 이미지 URL 설정
        setUserDocId(doc.id);
      });
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  const fetchUserPosts = async (uid) => {
    try {
      const q = query(collection(db, "GrooveTop"), where("authorId", "==", uid));
      const querySnapshot = await getDocs(q);
      const userPostsData = [];
      querySnapshot.forEach((doc) => {
        const postData = doc.data();
        const timestampSeconds = postData.Timestamp.seconds;
        const date = new Date(timestampSeconds * 1000);
        const formattedTime = format(date, "yyyy-MM-dd HH:mm:ss");
        userPostsData.push({
          ...postData,
          id: doc.id,
          formattedTime: formattedTime,
          likesCount: Object.keys(postData.likes || {}).length
        });
      });
      setUserPosts(userPostsData);
    } catch (error) {
      console.error("Error fetching user posts:", error);
    }
  };

  const handleNicknameChange = async () => {
    if (newNickname.trim() === "") {
      alert("닉네임을 입력해주세요.");
      return;
    }

    const confirmUpdate = window.confirm("정말 변경 하시겠습니까?");
    if (!confirmUpdate) return;

    try {
      const userDocRef = doc(db, "logInData", userDocId);
      await updateDoc(userDocRef, {
        nickname: newNickname.trim()
      });
      setNickname(newNickname.trim());
      setEditingNickname(false);
      setNewNickname("");
    } catch (error) {
      console.error("Error updating nickname:", error);
    }
  };

  return (
    <div>
      <GrooveHeader
        currentUser={currentUser}
        isUserLogIn={isUserLogIn}
        setIsUserLogIn={setIsUserLogIn}
        isMyIconClicked={isMyIconClicked}
        setIsMyIconClicked={setIsMyIconClicked}
        setTotalUsersInformation={setTotalUsersInformation}
        logInModal={logInModal}
        setLogInModal={setLogInModal}
        nickname={nickname}
        setNickname={setNickname}
        nicknameModal={nicknameModal}
        setNicknameModal={setNicknameModal}
        onNicknameChange={onNicknameChange}
      />

      <StDiv>
        {currentUser ? (
          <StDiv>
            <StDiv>
              <StUserContainer>
                <StInfo>사용자 정보:</StInfo>
                {profileImageUrl && <img src={profileImageUrl} alt="프로필 사진" />} {/* 프로필 이미지 렌더링 */}
                {editingNickname ? (
                  <div>
                    <p>
                      닉네임:
                      <StInput type="text" value={newNickname} onChange={(e) => setNewNickname(e.target.value)} />
                      <button onClick={handleNicknameChange}>변경</button>
                      <button onClick={() => setEditingNickname(false)}>취소</button>
                    </p>
                  </div>
                ) : (
                  <StNickname>
                    닉네임: {nickname} <StEditbtn onClick={() => setEditingNickname(true)}>변경</StEditbtn>
                  </StNickname>
                )}
                <p>이메일 주소: {userEmail}</p>
              </StUserContainer>
              <p>작성한 글 목록:</p>
              {userPosts.length > 0 ? (
                <StUl>
                  {userPosts.map((post, index) => (
                    <li key={index}>
                      <StPostLink
                        to={{
                          pathname: `/detail/${post.id}`
                        }}
                        state={userPosts}
                        setUserPosts={setUserPosts}
                      >
                        <StPostContainer>
                          <div>
                            <StTitle>{post.title}</StTitle>
                            <StContent>{post.body}</StContent>
                            <p>{post.formattedTime}</p>
                            <i className="fa-solid fa-heart" /> {Object.keys(post.likes || {}).length}개
                          </div>
                          <StImageWrapper>
                            <StImage src={post.imageUrl} alt="업로드된 이미지" />
                          </StImageWrapper>
                        </StPostContainer>
                      </StPostLink>
                    </li>
                  ))}
                </StUl>
              ) : (
                <p>작성한 글이 없습니다.</p>
              )}
            </StDiv>
          </StDiv>
        ) : (
          <StyledMessage>
            <p>로그인이 필요합니다.</p>
          </StyledMessage>
        )}
      </StDiv>
      <StGrooveFooter />
    </div>
  );
}

const StDiv = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  min-height: 100vh;
`;

const StUserContainer = styled.div`
  margin: 6vh;
  line-height: 1.5;
  & > p {
    border-bottom: 1px solid #ffc41d;
    padding-bottom: 10px;
    margin-bottom: 10px;
  }
`;

const StInfo = styled.p`
  display: flex;
  text-align: center;
  justify-content: center;
  font-size: 20px;
  font-weight: bold;
`;

const StNickname = styled.p`
  justify-content: space-between;
  display: flex;
  align-items: center;
`;

const StyledMessage = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 25px;
  color: #ffff;
`;

const StUl = styled.ul`
  margin-top: 20px;
`;

const StInput = styled.input`
  border-color: #ffc41d;
  background-color: transparent;
`;

const StEditbtn = styled.button`
  background-color: transparent;
  border: none;
  color: #ffc41d;
  cursor: pointer;
  &:hover {
    filter: brightness(70%);
  }
  margin-left: auto;
`;

const StPostLink = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #ffff;
  border-bottom: 2px solid #ffc41d;
  padding-bottom: 10px;
  margin-bottom: 20px;
`;

const StImage = styled.img`
  width: 200px;
  height: 200px;
  object-fit: cover;
  margin-left: 30px;
`;

const StTitle = styled.p`
  font-size: 20px;
  margin-bottom: 15px;
  font-weight: bold;
`;

const StImageWrapper = styled.div`
  justify-self: end;
`;

const StPostContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
`;

const StContent = styled.p`
  font-size: 16px;
`;

const StGrooveFooter = styled(GrooveFooter)`
  margin-top: auto;
`;

export default MyPage;
