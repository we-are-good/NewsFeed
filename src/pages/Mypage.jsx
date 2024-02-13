import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { auth, db } from "../firebase";
import GrooveHeader from "../components/Groove/GrooveHeader";
import GrooveFooter from "../components/Groove/GrooveFooter";
import styled from 'styled-components';

function MyPage() {
  const [currentUser, setCurrentUser] = useState(null);
  const [userEmail, setUserEmail] = useState("");
  const [userNickname, setUserNickname] = useState("");

  useEffect(() => {
    // 사용자 로그인 상태가 변경될 때마다 호출되는 콜백 함수 등록
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setCurrentUser(user);
        setUserEmail(user.email);
      } else {
        setCurrentUser(null);
        setUserEmail("");
        setUserNickname("");
      }
    });

    // 컴포넌트가 언마운트될 때 등록된 콜백 함수 제거
    return () => {
      unsubscribe();
    };
  }, []);
  // 사용자 정보를 가져오는 함수
  const fetchData = async (email) => {
    try {
      // 이메일에 해당하는 사용자 정보 문서를 가져오기
      const querySnapshot = await db.collection('logInData').where('email', '==', email).get();
      if (!querySnapshot.empty) {
        // 이메일에 해당하는 사용자 정보가 있는 경우 닉네임 설정
        const userData = querySnapshot.docs[0].data();
        const nickname = userData.nickname;
        console.log("User's nickname:", nickname); // 닉네임을 콘솔에 출력
        setUserNickname(nickname); // 받아온 닉네임을 userNickname에 설정
      }
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  };

  useEffect(() => {
    // userEmail이 변경될 때마다 fetchData 함수 호출
    if (userEmail) {
      fetchData(userEmail);
    }
  }, [userEmail]);

  return (
    <div>
      <GrooveHeader />
      <StDiv>
        {currentUser ? (
          <StDiv>
            <div>
              <p>사용자 정보:</p>
              <p>이름: {userNickname}</p> {/* 닉네임을 이름으로 출력 */}
              <p>이메일: {userEmail}</p> {/* 이메일 표시 */}
              <p>작성한 글 목록:</p>
            </div>
          </StDiv>
        ) : (
          <StyledMessage>
            <p>로그인이 필요합니다.</p>
            <Link to="/login">로그인하러 가기</Link>
          </StyledMessage>
        )}
      </StDiv>
      <GrooveFooter />
    </div>
  );
}

const StDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const StyledMessage = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 25px;
  color: #ffff;
`;

export default MyPage;
