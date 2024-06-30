import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import React, { useContext } from "react";
import { auth, db } from "../../../firebase";
import { GrooveContext } from "../../../shared/Context";

import {
  IDPWBox,
  IDPWBoxWrap,
  LogInButtonsBox,
  LogInForm,
  LogInSmallButton,
  LogSigninButton
} from "../../../style/GrooveAuthStyle";
import GrooveSocialLogIn from "./GrooveSocialLogIn";

function GrooveMailSignUp() {
  const {
    setIsUserLogIn,
    nickname,
    setNickname,
    onNicknameChange,
    email,
    setEmail,
    password,
    setPassword,
    onEmailChange,
    onPasswordChange,
    setSignUpModal,
    openLogInModal
  } = useContext(GrooveContext);

  const closeSignUpModal = () => {
    setSignUpModal(false);
  };

  const signUp = async (event) => {
    event.preventDefault();
    try {
      if (!email || !password || !nickname) {
        return alert("빈칸을 입력하세요");
      }

      if (password.length < 7) {
        return alert("비밀번호는 여섯글자 이상이어야 합니다.");
      }

      const nowUserData = onAuthStateChanged(auth, (user) => {
        if (user) return;
      });
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const newUser = {
        email: email,
        nickname: nickname,
        profileImage: "gs:groove-f6911.appspot.com/profileImage/왜되는걸까.jpeg"
      }; // 기본 프로필 이미지 URL 추가
      const collectionRef = collection(db, "UserObj");
      await addDoc(collectionRef, newUser);
      closeSignUpModal();
      setIsUserLogIn(true);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorCode, errorMessage);
      setIsUserLogIn(false);
    } finally {
      setEmail("");
      setNickname("");
      setPassword("");
    }
  };

  return (
    <div>
      <div>
        <LogInForm>
          <div>
            <LogSigninButton
              type="button"
              name="activeName"
              onClick={() => {
                closeSignUpModal();
                openLogInModal();
              }}
            >
              Log in
            </LogSigninButton>
            <LogSigninButton type="button" name="ignore-click">
              Sign up
            </LogSigninButton>
          </div>
          <IDPWBoxWrap>
            <IDPWBox>
              <input
                placeholder="E-mail"
                type="text"
                name="email"
                autoComplete="username"
                value={email}
                onChange={onEmailChange}
              />
            </IDPWBox>
            <IDPWBox>
              <input
                placeholder="Nickname"
                type="text"
                name="text"
                autoComplete="username"
                value={nickname}
                onChange={onNicknameChange}
              />
            </IDPWBox>
            <IDPWBox>
              <input
                placeholder="PASSWORD"
                type="password"
                name="password"
                autoComplete="new-password"
                value={password}
                onChange={onPasswordChange}
              />
            </IDPWBox>
            <LogInButtonsBox>
              <LogInSmallButton type="button" onClick={signUp}>
                Sign up
              </LogInSmallButton>
            </LogInButtonsBox>
          </IDPWBoxWrap>
          <GrooveSocialLogIn />
        </LogInForm>
      </div>
    </div>
  );
}

export default GrooveMailSignUp;
