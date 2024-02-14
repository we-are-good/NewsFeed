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
import { collection, getDocs, query } from "firebase/firestore";

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
  const navigate = useNavigate();

  const logOut = async (event) => {
    await signOut(auth);
    setIsMyIconClicked(false);
    setIsUserLogIn(false);
  };

  const myIconClick = () => {
    return setIsMyIconClicked(true);
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
              <GrooveHeaderIconMy onClick={() => myIconClick()}>
                <i className="fa-solid fa-user" />
              </GrooveHeaderIconMy>
            </GrooveHeaderIcons>
          ) : (
            <>
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
        </GrooveHeaderIconWrap>
      </GrooveHeaderWrap>
    </>
  );
}

export default GrooveHeader;
