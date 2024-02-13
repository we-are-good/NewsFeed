import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { auth, db } from "../firebase";
import { collection, query, where, getDocs } from 'firebase/firestore';
import GrooveHeader from "../components/Groove/GrooveHeader";
import GrooveFooter from "../components/Groove/GrooveFooter";
import styled from 'styled-components';

function MyPage({}) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userNickname, setUserNickname] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userUid, setUserUid] = useState("");
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setCurrentUser(user);
        setUserEmail(user.email); // 현재 로그인한 사용자의 이메일 설정
        setUserUid(user.uid); // 현재 로그인한 사용자의 UID 설정
        fetchData(user.email);
        fetchUserPosts(user.uid); // 사용자가 작성한 글 가져오기
      } else {
        setCurrentUser(null);
        setUserNickname("");
        setUserEmail("");
        setUserUid("");
        setUserPosts([]);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const fetchData = async (email) => {
    try {
      const querySnapshot = await db.collection('logInData').where('email', '==', email).get();
      querySnapshot.forEach(doc => {
        const userData = doc.data();
        const nickname = userData.nickname;
        setUserNickname(nickname);
      });
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  };

  const fetchUserPosts = async (uid) => {
    try {
      const q = query(collection(db, "GrooveTop"), where("authorId", "==", uid));
      const querySnapshot = await getDocs(q);
      const userPostsData = [];
      querySnapshot.forEach(doc => {
        const postData = doc.data();
        userPostsData.push(postData);
      });
      setUserPosts(userPostsData);
    } catch (error) {
      console.error('Error fetching user posts:', error);
    }
  };

  return (
    <div>
      <GrooveHeader />
      <StDiv>
        {currentUser ? (
          <StDiv>
            <div>
              <p>사용자 정보:</p>
              <p>Nickname: {userNickname}</p>
              <p>Email: {userEmail}</p>
              <p>작성한 글 목록:</p>
              {userPosts.length > 0 ? (
                <ul>
                  {userPosts.map((post, index) => (
                    <li key={index}>
                     <img src={post.imageUrl} alt="업로드된 이미지" />
                    <p>{post.title}</p>
                    <p>{post.body}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>작성한 글이 없습니다.</p>
              )}
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
