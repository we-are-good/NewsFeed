import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import GrooveHeader from "../components/Groove/GrooveHeader";
import GrooveFooter from "../components/Groove/GrooveFooter";
import styled from "styled-components";

function MyPage() {
  const [currentUser, setCurrentUser] = useState(null); // 현재 로그인한 사용자 정보 상태
  const [userPosts, setUserPosts] = useState([]); // 현재 사용자가 작성한 글 목록 상태

  useEffect(() => {
    // 현재 로그인한 사용자 정보 가져오기
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    // 현재 사용자가 작성한 글 목록 가져오기
    const fetchUserPosts = async () => {
      if (currentUser) {
        const querySnapshot = await db.collection("posts").where("userId", "==", currentUser.uid).get();
        const userPostsData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setUserPosts(userPostsData);
      }
    };

    fetchUserPosts();
  }, [currentUser]);

  return (
    <div>
      <GrooveHeader />
      <StDiv>
        {currentUser ? (
          <StDiv>
            <div>
              <p>사용자 정보:</p>
              <p>이름: {currentUser.displayName}</p>
              <p>이메일: {currentUser.email}</p>
              <p>작성한 글 목록:</p>
            </div>
            <StList>
              {userPosts.map((post) => (
                <li key={post.id}>{post.title}</li>
              ))}
            </StList>
          </StDiv>
        ) : (
          <p>로그인이 필요합니다.</p>
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

const StList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

export default MyPage;
