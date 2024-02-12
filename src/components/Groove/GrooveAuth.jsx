import React, { useEffect } from "react";
import { useState } from "react";
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
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { collection, getDocs, query, addDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { GoogleAuthProvider, signInWithPopup, GithubAuthProvider } from "firebase/auth";

function GrooveAuth() {
  const [logInModal, setLogInModal] = useState(false);
  const [signUpModal, setSignUpModal] = useState(false);
  const [socialLogInModal, setSocialLogInModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [totalUsersInformation, setTotalUsersInformation] = useState([]);
  const [isUserLogIn, setIsUserLogIn] = useState(false);

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
    event.preventDefault();
    await signOut(auth);
    setIsUserLogIn(false);
  };

  const signUp = async (event) => {
    event.preventDefault();
    try {
      if (!email || !password || !nickname) {
        return alert("빈칸을 입력하세요");
      }
      const nowUserData = onAuthStateChanged(auth, (user) => {
        if (user) return;
      });
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("userCredential", userCredential);
      const newUser = { email: email, nickname: nickname };
      const collectionRef = collection(db, "logInData");
      await addDoc(collectionRef, newUser);
      closeSignUpModal();
      setIsUserLogIn(true);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorCode, errorMessage);
    } finally {
      setEmail("");
      setNickname("");
      setPassword("");
    }
  };

  const fetchData = async () => {
    const q = query(collection(db, "logInData"));
    const querySnapshot = await getDocs(q);
    const quaryData = await querySnapshot.forEach((doc) => {
      const userInformation = {
        id: doc.id,
        email: doc.data().email,
        nickname: doc.data().nickname
      };
    });
    setTotalUsersInformation(quaryData);
  };

  useEffect(() => {
    const nowUserData = onAuthStateChanged(auth, (user) => {
      if (!user) return;
      const nowUserEmail = user.email;
      if (!email) return;
      console.log("nowUserEmail", nowUserEmail);
      setEmail(nowUserEmail);
      console.log(email);

      const userTotalData = fetchData();
      console.log(userTotalData);
      const nowUserInformation = totalUsersInformation.find((user) => user.email === nowUserEmail);
      if (!nowUserInformation) return;
      const nowUserNickname = nowUserInformation.nickname;
      console.log("nowUserNickname", nowUserNickname);
      setNickname(nowUserNickname);
    });
  }, [setEmail]);

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const popUpforLogin = await signInWithPopup(auth, provider);
      console.log("popUpforLogin", popUpforLogin);
      const googleLogInUserEmail = popUpforLogin.user.email;
      console.log(googleLogInUserEmail);

      if (totalUsersInformation.find(googleLogInUserEmail)) {
        return alert("이미 가입한 이메일입니다.");
      }

      const openModal = await openSocialLogInModal();
      const getSocialLogInNickName = await socialLogInNickname();

      const newUser = { email: googleLogInUserEmail, nickname: socialLogInNickname };
      const collectionRef = collection(db, "logInData");
      await addDoc(collectionRef, newUser);
      setIsUserLogIn(true);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      const credential = GoogleAuthProvider.credentialFromError(error);
      alert("오류가 발생했습니다.");
    } finally {
      closeSocialLogInModal();
    }
  };

  const handleGitLogin = async () => {
    try {
      const provider = new GithubAuthProvider();
      const popUpforLogin = await signInWithPopup(auth, provider);
      console.log("popUpforLogin", popUpforLogin);
      const credential = GithubAuthProvider.credentialFromResult(popUpforLogin);
      const token = credential.accessToken;
      const user = popUpforLogin.user;
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      const credential = GithubAuthProvider.credentialFromError(error);
      alert("오류가 발생했습니다.");
    }
  };

  const socialLogInNickname = () => {
    if (!nickname) {
      return alert("빈칸을 입력해 주세요!");
    }
    setNickname(nickname);
  };

  return (
    <div>
      {!isUserLogIn && (
        <div>
          <button onClick={openLogInModal}>Log in</button>
        </div>
      )}
      {isUserLogIn && (
        <div>
          <button onClick={logOut}>Log out</button>
        </div>
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
                <PromptLogIn type="button" onClick={handleGoogleLogin}>
                  Google
                </PromptLogIn>
                <PromptLogIn type="button" onClick={handleGitLogin}>
                  Git
                </PromptLogIn>
              </GoogleGitLogIn>
            </LogInForm>
          </div>
        )}
      </div>

      <div>
        {socialLogInModal && (
          <SocialLogInNickname>
            <input
              placeholder="Nickname"
              type="text"
              required
              minLength={4}
              value={nickname}
              onChange={onNicknameChange}
            />
            <button onClick={socialLogInNickname}>확인</button>
          </SocialLogInNickname>
        )}
      </div>
    </div>
  );
}

export default GrooveAuth;
