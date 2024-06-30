import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import React, { useContext } from "react";
import { auth, db } from "../../../firebase";
import GrooveSocialLogIn from "./SocialLogIn";
import { toast } from "react-toastify";
import { GrooveContext } from "../../../shared/Context";

import {
  IDPWBox,
  IDPWBoxWrap,
  LogInButtonsBox,
  LogInForm,
  LogInSmallButton,
  LogSigninButton
} from "../../../style/AuthStyle";

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

      onAuthStateChanged(auth, (user) => {
        if (user) return;
      });
      await createUserWithEmailAndPassword(auth, email, password);
      const newUser = {
        email,
        nickname,
        profileImage: "gs:groove-f6911.appspot.com/profileImage/왜되는걸까.jpeg"
      };
      const collectionRef = collection(db, "UserObj");
      closeSignUpModal();
      setIsUserLogIn(true);
      await addDoc(collectionRef, newUser);
    } catch (error) {
      toast.error("Error Notification!", { position: "top-left" });
      setIsUserLogIn(false);
    } finally {
      setEmail("");
      setNickname("");
      setPassword("");
    }
  };

  return (
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
          <LogInSmallButton type="submit" onClick={(e) => signUp}>
            Sign up
          </LogInSmallButton>
        </LogInButtonsBox>
      </IDPWBoxWrap>
      <GrooveSocialLogIn />
    </LogInForm>
  );
}

export default GrooveMailSignUp;
