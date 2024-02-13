// groove-3e149.firebaseapp.com
import React, { useEffect, useState } from "react";
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
import { getAuth } from "firebase/auth";
import { collection, getDocs, query, addDoc } from "firebase/firestore";

import { GoogleAuthProvider, signInWithPopup, GithubAuthProvider } from "firebase/auth";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LOGIN, LOGOUT } from "../../shared/redux/authIsLogIn";

import { auth, db } from "../../firebase";



function GrooveAuth() {
  const [logInModal, setLogInModal] = useState(false);
  const [signUpModal, setSignUpModal] = useState(false);
  const [socialLogInModal, setSocialLogInModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [totalUsersInformation, setTotalUsersInformation] = useState([]);

  const nowLogInEmail = useRef("");
  const nowLogInNickname = useRef("");
  const nowUser = useRef("");
  let googleLogInUserEmail = "";

  const dispatch = useDispatch();
  const isUserLogIn = useSelector((state) => state.isUserLogIn);

  console.log("nowLogInEmail", nowLogInEmail.current);
  console.log("nowLogInNickname", nowLogInNickname.current);
  console.log("isUserLogIn", isUserLogIn);

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

  const handleLogIn = () => {
    dispatch(LOGIN());
  };
  const handleLogOut = () => {
    dispatch(LOGOUT());
  };

  const Login = async (event) => {
    try {
      if (!email || !password) {
        return alert("빈칸을 입력하세요");
      }
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      closeLogInModal();
      const login = handleLogIn;
      console.log(login);
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
    handleLogOut();
    await signOut(auth);
    nowUser.current = "";
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
      handleLogIn();
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorCode, errorMessage);
      handleLogOut();
    } finally {
      setEmail("");
      setNickname("");
      setPassword("");
    }
  };

  const auth = getAuth();
  const user = auth.currentUser;
  nowUser.current = user;
  console.log("nowUser", nowUser.current);

  useEffect(() => {
    const fetchData = async (userEmail) => {
      const q = query(collection(db, "logInData"));
      const querySnapshot = await getDocs(q);

      const totalUsersInformation = await querySnapshot.docs.map((doc) => ({
        email: doc.data().email,
        nickname: doc.data().nickname
      }));
      setTotalUsersInformation(totalUsersInformation);
      console.log(totalUsersInformation);
      const LogInNickname = await totalUsersInformation.find((information) => information.email === userEmail).nickname;
      nowLogInNickname.current = LogInNickname;
      console.log("nowLogInEmail.current", nowLogInEmail.current);
      console.log("nowLogInNickname", LogInNickname);
      if (!totalUsersInformation) return;
    };

    if (user) {
      console.log("user", user);
      const userEmail = user.email;
      handleLogIn();
      setLogInModal(false);
      fetchData(userEmail);
    } else {
      console.log("user in else", user);
    }
  }, [user]);

  const socialLogInNickname = () => {
    if (!nickname) {
      return alert("빈칸을 입력해 주세요!");
    }
    setNickname(nickname);
    closeSocialLogInModal();
  };

  const handleGoogleSignUp = async () => {
    try {
      const provider = await new GoogleAuthProvider();
      const popUpforLogin = await signInWithPopup(auth, provider);

      const alreadySignUpEmail = await fetchSignInMethodsForEmail(auth, googleLogInUserEmail);
      handleLogIn(); // 오류가 수정되면 옮겨질 예정이다.

      googleLogInUserEmail = popUpforLogin.user.email;
      console.log("googleLogInUserEmail", googleLogInUserEmail);

      setSignUpModal(false);
      openSocialLogInModal();
      const getSocialLogInNickName = await socialLogInNickname; //닉네임을 정하는 함수

      const newUser = { email: googleLogInUserEmail, nickname: socialLogInNickname };
      const collectionRef = collection(db, "logInData");
      await addDoc(collectionRef, newUser);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("errorCode", errorCode);
      console.log("errorMessage", errorMessage);
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
      const credential = GithubAuthProvider.credentialFromResult(popUpforLogin);

      setSignUpModal(false);
      const openModal = openSocialLogInModal;
      const getSocialLogInNickName = await socialLogInNickname;

      // const newUser = { email: googleLogInUserEmail, nickname: socialLogInNickname };
      // const collectionRef = collection(db, "logInData");
      // await addDoc(collectionRef, newUser);
      // setIsUserLogIn(true);

      const token = credential.accessToken;
      const user = popUpforLogin.user;
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      const credential = GithubAuthProvider.credentialFromError(error);
      alert("오류가 발생했습니다.");
    }
  };

  return (
    <div>
      {isUserLogIn ? (
        <button type="button" onClick={logOut}>
          Log out
        </button>
      ) : (
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
