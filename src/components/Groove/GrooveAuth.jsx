// groove-3e149.firebaseapp.com
import React, { useEffect, useState, useContext } from "react";
import {
  OverlayForm,
  LogInForm,
  LogSigninButton,
  IDPWBox,
  LogInButtonsBox,
  LogInSmallButton,
  PromptLogIn,
  GoogleGitLogIn,
  SocialLogInNickname
} from "../../style/GrooveAuthStyle";
import {
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";
import { collection, getDocs, query, addDoc } from "firebase/firestore";
import { GoogleAuthProvider, signInWithPopup, GithubAuthProvider } from "firebase/auth";
import { db } from "../../firebase";
import { GrooveContext } from "../../context/GrooveContext";

function GrooveAuth() {
  const {
    socialLogInModal,
    setSocialLogInModal,
    email,
    setEmail,
    password,
    setPassword,
    nickname,
    setNickname,
    auth,
    user,
    isUserLogIn,
    setIsUserLogIn,
    logInModal,
    setLogInModal,
    nowUserInformation
  } = useContext(GrooveContext);

  nowUserInformation();

  const [signUpModal, setSignUpModal] = useState(false);

  const onEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const onPasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const onNicknameChange = (event) => {
    setNickname(event.target.value);
  };

  const openLogInModal = () => {
    setLogInModal(true);
  };

  const closeLogInModal = () => {
    setLogInModal(false);
  };

  const openSignUpModal = () => {
    setSignUpModal(true);
  };
  const closeSignUpModal = () => {
    setSignUpModal(false);
  };

  const openSocialLogInModal = () => {
    setSocialLogInModal(true);
  };
  const closeSocialLogInModal = () => {
    setSocialLogInModal(false);
  };

  const closeLogInSignUpModal = () => {
    setSignUpModal(false);
    setLogInModal(false);
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
      alert("오류가 발생했습니다.");
    } finally {
      setEmail("");
      setNickname("");
      setPassword("");
    }
  };

  const logOut = async (event) => {
    setIsUserLogIn(false);
    await signOut(auth);
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
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const newUser = { email: email, nickname: nickname };
      const collectionRef = collection(db, "logInData");
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

  const socialLogInNickname = () => {
    if (!nickname) {
      return alert("빈칸을 입력해 주세요!");
    }
    setNickname(nickname);
    const newUser = { email: user.email, nickname };
    const collectionRef = collection(db, "logInData");
    addDoc(collectionRef, newUser);
    closeSocialLogInModal();
    setNickname("");
  };

  const handleGoogleSignUp = async () => {
    try {
      const provider = await new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      setIsUserLogIn(true);
      setSignUpModal(false);
      setSocialLogInModal(true);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("errorCode", errorCode);
      console.log("errorMessage", errorMessage);
      const credential = GoogleAuthProvider.credentialFromError(error);
      alert("오류가 발생했습니다.");
    }
  };

  const handleGitLogin = async () => {
    try {
      const provider = new GithubAuthProvider();
      const popUpforLogin = await signInWithPopup(auth, provider);
      const credential = GithubAuthProvider.credentialFromResult(popUpforLogin);

      setIsUserLogIn(true);
      setSignUpModal(false);
      setSocialLogInModal(true);
      const openModal = openSocialLogInModal;
      const getSocialLogInNickName = await socialLogInNickname;
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      const credential = GithubAuthProvider.credentialFromError(error);
      alert("오류가 발생했습니다.");
    }
  };

  return (
    <div>
      {isUserLogIn && (
        <button type="button" onClick={logOut}>
          Log out
        </button>
      )}
      {!isUserLogIn && (
        <button type="button" onClick={openLogInModal}>
          Log in
        </button>
      )}
      {(logInModal || signUpModal || socialLogInModal) && (
        <div>
          <OverlayForm onClick={closeLogInSignUpModal} />
        </div>
      )}
      <div>
        {logInModal && !signUpModal && !socialLogInModal && (
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
              <IDPWBox>
                <input placeholder="E-mail" type="text" name="email" value={email} onChange={onEmailChange} />
              </IDPWBox>
              <IDPWBox>
                <input
                  placeholder="PASSWORD"
                  type="password"
                  name="password"
                  value={password}
                  onChange={onPasswordChange}
                />
              </IDPWBox>
              <LogInButtonsBox>
                <LogInSmallButton type="button" onClick={Login}>
                  Log in
                </LogInSmallButton>
              </LogInButtonsBox>
            </LogInForm>
          </div>
        )}
      </div>

      <div>
        {signUpModal && !socialLogInModal && (
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
              <IDPWBox>
                <input placeholder="E-mail" type="text" name="email" value={email} onChange={onEmailChange} />
              </IDPWBox>
              <IDPWBox>
                <input placeholder="Nickname" type="text" name="text" value={nickname} onChange={onNicknameChange} />
              </IDPWBox>
              <IDPWBox>
                <input
                  placeholder="PASSWORD"
                  type="password"
                  name="password"
                  value={password}
                  onChange={onPasswordChange}
                />
              </IDPWBox>
              <LogInButtonsBox>
                <LogInSmallButton type="button" onClick={signUp}>
                  Sign up
                </LogInSmallButton>
              </LogInButtonsBox>

              <div>or sign up with</div>

              <GoogleGitLogIn>
                <PromptLogIn type="button" onClick={handleGoogleSignUp}>
                  Google
                </PromptLogIn>
                <PromptLogIn type="button" onClick={handleGitLogin}>
                  Github
                </PromptLogIn>
              </GoogleGitLogIn>
            </LogInForm>
          </div>
        )}
      </div>

      <div>
        {socialLogInModal && (
          <SocialLogInNickname>
            <input placeholder="Nickname" type="text" required value={nickname} onChange={onNicknameChange} />
            <button onClick={socialLogInNickname}>확인</button>
          </SocialLogInNickname>
        )}
      </div>
    </div>
  );
}

export default GrooveAuth;
