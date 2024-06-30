// groove-3e149.firebaseapp.com
import React, { useContext, useEffect, useState } from "react";
import { OverlayForm, BackgroundLogInButton } from "../../../style/AuthStyle";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../../../firebase";
import { GrooveContext } from "../../../shared/Context";
import GrooveMailLogIn from "./MailLogIn";
import GrooveMailSignUp from "./MailSignUp";

function GrooveAuth() {
  const {
    isUserLogIn,
    currentUser,
    setIsUserLogIn,
    setTotalUsersInformation,
    logInModal,
    setLogInModal,
    nicknameModal,
    signUpModal,
    setSignUpModal,
    openLogInModal
  } = useContext(GrooveContext);

  const closeLogInSignUpModal = () => {
    setSignUpModal(false);
    setLogInModal(false);
  };

  useEffect(() => {
    const fetchData = async (userEmail) => {
      const q = query(collection(db, "UserObj"));
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
      if (!totalUsersInformation) return;
    };

    if (currentUser) {
      const userEmail = currentUser.email;
      setIsUserLogIn(true);
      setLogInModal(false);
      fetchData(userEmail);
    }
  }, [currentUser]);

  return (
    <div>
      {!isUserLogIn && (
        <BackgroundLogInButton type="button" onClick={openLogInModal}>
          <i className="fa-solid fa-arrow-right-to-bracket" />
        </BackgroundLogInButton>
      )}
      {(logInModal || signUpModal) && <OverlayForm onClick={closeLogInSignUpModal} />}
      <div>{logInModal && !signUpModal && <GrooveMailLogIn />}</div>

      <div>{signUpModal && !nicknameModal && <GrooveMailSignUp />}</div>
    </div>
  );
}

export default GrooveAuth;
