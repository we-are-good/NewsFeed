import React, { useEffect, useState } from "react";
import {
  GrooveHeaderWrap,
  GrooveHeaderLogo,
  GrooveHeaderIconWrap,
  GrooveHeaderIconHome,
  GrooveHeaderIconWrite,
  GrooveHeaderIconMy
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
  setTotalUsersInformation
}) {
  const navigate = useNavigate();
  const [logInUserNickname, setLogInUserNickname] = useState("");

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
      setLogInUserNickname(nowLogInNickname);
      if (!totalUsersInformation) return;
    };

    if (user) {
      const userEmail = user.email;
      setIsUserLogIn(true);
      setLogInModal(false);
      fetchData(userEmail);
    } else {
    }
  }, [user]);

  return (
    <>
      <GrooveHeaderWrap>
        <GrooveHeaderLogo onClick={() => navigate("/")}>Groove</GrooveHeaderLogo>
        <GrooveHeaderIconWrap>
          {/* <GrooveAuth currentUser={currentUser} /> */}
          {currentUser ? (
            <div>
              <div>{logInUserNickname}님 환영합니다!</div>
              <div>
                <GrooveHeaderIconHome onClick={() => navigate("/")}>
                  <i className="fa-solid fa-house" />
                </GrooveHeaderIconHome>
                <GrooveHeaderIconWrite onClick={() => navigate("/write")}>
                  <i className="fa-solid fa-pen" />
                </GrooveHeaderIconWrite>
                <GrooveHeaderIconMy onClick={() => myIconClick()}>
                  <i className="fa-solid fa-user" />
                </GrooveHeaderIconMy>
              </div>
            </div>
          ) : (
            <GrooveAuth
              currentUser={currentUser}
              setTotalUsersInformation={setTotalUsersInformation}
              logInModal={logInModal}
              setLogInModal={setLogInModal}
              setIsUserLogIn={setIsUserLogIn}
            />
          )}

          {isMyIconClicked && (
            <div>
              <button type="button" onClick={logOut}>
                Logout
              </button>
              <button type="button" onClick={goMyPage}>
                My page
              </button>
            </div>
          )}
        </GrooveHeaderIconWrap>
      </GrooveHeaderWrap>
    </>
  );
}

export default GrooveHeader;
