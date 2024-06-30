import React from "react";
import { useContext } from "react";
import { GrooveContext } from "../../../shared/Context";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase";
import { toast } from "react-toastify";

import {
  LogInForm,
  LogSigninButton,
  TopText,
  IDPWBoxWrap,
  IDPWBox,
  LogInButtonsBox,
  LogInSmallButton
} from "../../../style/AuthStyle";

function GrooveMailLogIn() {
  const {
    setIsUserLogIn,
    setNickname,
    setLogInModal,
    setSignUpModal,
    email,
    setEmail,
    password,
    setPassword,
    onEmailChange,
    onPasswordChange
  } = useContext(GrooveContext);
  const closeLogInModal = () => {
    setLogInModal(false);
  };

  const openSignUpModal = () => {
    setSignUpModal(true);
  };

  const LoginWithEmail = async (event) => {
    event.preventDefault();
    try {
      if (!email || !password) {
        return alert("빈칸을 입력하세요");
      }
      await signInWithEmailAndPassword(auth, email, password);
      closeLogInModal();
      setIsUserLogIn(true);
    } catch (error) {
      toast.error("Error Notification!", { position: "top-left" });
    } finally {
      setEmail("");
      setNickname("");
      setPassword("");
    }
  };

  return (
    <LogInForm>
      <div>
        <LogSigninButton type="button" name="ignore-click">
          Log in
        </LogSigninButton>
        <LogSigninButton
          type="button"
          onClick={() => {
            closeLogInModal();
            openSignUpModal();
          }}
        >
          Sign up
        </LogSigninButton>
      </div>
      <TopText>
        <h3>Welcome back!</h3>
        <h4>Please sign in to your account</h4>
      </TopText>
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
            placeholder="PASSWORD"
            type="password"
            name="password"
            autoComplete="new-password"
            value={password}
            onChange={onPasswordChange}
          />
        </IDPWBox>
        <LogInButtonsBox>
          <LogInSmallButton type="submit" onClick={(e) => LoginWithEmail}>
            Log in
          </LogInSmallButton>
        </LogInButtonsBox>
      </IDPWBoxWrap>
    </LogInForm>
  );
}

export default GrooveMailLogIn;
