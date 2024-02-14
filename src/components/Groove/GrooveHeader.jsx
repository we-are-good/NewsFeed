import React, { useEffect, useState } from "react";
import {
  GrooveHeaderWrap,
  GrooveHeaderLogo,
  GrooveHeaderIconWrap,
  GrooveHeaderIconHome,
  GrooveHeaderIconWrite,
  GrooveHeaderIconMy,
  GrooveHeaderIconSelection,
  GrooveHeaderIcons
} from "../../style/GrooveHeaderStyle";

import GrooveAuth from "./GrooveAuth";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth, db } from "../../firebase";
import { addDoc, collection, getDocs, query } from "firebase/firestore";
import { SocialLogInNickname } from "../../style/GrooveAuthStyle";

function GrooveHeader({
  currentUser,
  setIsUserLogIn,
  isMyIconClicked,
  setIsMyIconClicked,
  setLogInModal,
  logInModal,
  setTotalUsersInformation,
  nickname,
  setNickname
}) {
  const [nicknameModal, setNicknameModal] = useState(false);
  const onNicknameChange = (event) => {
    setNickname(event.target.value);
  };

  const navigate = useNavigate();

  const logOut = async (event) => {
    await signOut(auth);
    setIsMyIconClicked(false);
    setIsUserLogIn(false);
  };

  const myIconClick = () => {
    setIsMyIconClicked((prevState) => !prevState);
  };

  const goMyPage = () => {
    setIsMyIconClicked(false);
    navigate("/mypage");
  };

  const goHome = () => {
    setIsMyIconClicked(false);
    navigate("/");
  };

  const goWrite = () => {
    setIsMyIconClicked(false);
    navigate("/write");
  };

  const user = currentUser;
  const socialLogInNickname = () => {
    if (!nickname) {
      return alert("빈칸을 입력해 주세요!");
    }
    setNickname(nickname);
    const newUser = { email: user.email, nickname };
    const collectionRef = collection(db, "logInData");
    addDoc(collectionRef, newUser);
    setNicknameModal(false);
    setNickname("");
    console.log(newUser);
  };

  useEffect(() => {
    const fetchData = async (userEmail) => {
      const q = query(collection(db, "logInData"));
      const querySnapshot = await getDocs(q);

      const totalUsersInformation = await querySnapshot.docs.map((doc) => ({
        email: doc.data().email,
        nickname: doc.data().nickname
      }));
      setTotalUsersInformation(totalUsersInformation);
      const nowLogIn = await totalUsersInformation.find((information) => information.email === userEmail);
      if (!nowLogIn) {
        return;
      }
      const nowLogInNickname = nowLogIn.nickname;
      setNickname(nowLogInNickname);
      if (!totalUsersInformation) return;
    };

    if (user) {
      const userEmail = user.email;
      setIsUserLogIn(true);
      setLogInModal(false);
      fetchData(userEmail);
    } else {
    }
  }, [user, nickname]);
  console.log("currentUser", currentUser);

  return (
    <>
      <GrooveHeaderWrap>
        <GrooveHeaderLogo onClick={goHome}>Groove</GrooveHeaderLogo>
        <GrooveHeaderIconWrap>
          {currentUser ? (
            <GrooveHeaderIcons>
              <div>{nickname}님 환영합니다!</div>
              <GrooveHeaderIconHome onClick={goHome}>
                <i className="fa-solid fa-house" />
              </GrooveHeaderIconHome>
              <GrooveHeaderIconWrite onClick={goWrite}>
                <i className="fa-solid fa-pen" />
              </GrooveHeaderIconWrite>
              <GrooveHeaderIconMy onClick={myIconClick}>
                <i className="fa-solid fa-user" />
              </GrooveHeaderIconMy>
            </GrooveHeaderIcons>
          ) : (
            <GrooveAuth
              nickname={nickname}
              setNickname={setNickname}
              currentUser={currentUser}
              setTotalUsersInformation={setTotalUsersInformation}
              logInModal={logInModal}
              setLogInModal={setLogInModal}
              setIsUserLogIn={setIsUserLogIn}
              onNicknameChange={onNicknameChange}
            />
          )}
          {isMyIconClicked && (
            <div>
              <GrooveHeaderIconSelection>
                <button type="button" onClick={logOut}>
                  Log-out
                </button>
                <button type="button" onClick={goMyPage}>
                  My-page
                </button>
              </GrooveHeaderIconSelection>
            </div>
          )}
          {!nickname && currentUser && (
            <SocialLogInNickname>
              <input placeholder="Nickname" type="text" required value={nickname} onChange={onNicknameChange} />
              <button onClick={socialLogInNickname}>확인</button>
            </SocialLogInNickname>
          )}
        </GrooveHeaderIconWrap>
      </GrooveHeaderWrap>
    </>
  );
}

export default GrooveHeader;
