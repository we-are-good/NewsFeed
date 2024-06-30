import React from "react";
import { useContext } from "react";
import { GrooveContext } from "../../../shared/Context";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase";

import {
  LogInForm,
  LogSigninButton,
  TopText,
  IDPWBoxWrap,
  IDPWBox,
  LogInButtonsBox,
  LogInSmallButton
} from "../../../style/GrooveAuthStyle";
import { toast } from "react-toastify";

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

  const Login = async (event) => {
    try {
      if (!email || !password) {
        return alert("빈칸을 입력하세요");
      }
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      closeLogInModal();
      setIsUserLogIn(true);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      toast.error("Error Notification!", { position: "top-left" });
      console.log("errorCode", errorCode);
      console.log("errorMessage", errorMessage);

      alert("오류가 발생했습니다.");
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
              <LogInSmallButton type="button" onClick={Login}>
                Log in
              </LogInSmallButton>
            </LogInButtonsBox>
          </IDPWBoxWrap>
        </LogInForm>
      </div>
    </div>
  );
}

export default GrooveMailLogIn;
