import { getAuth, onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import React from "react";
export const GrooveContext = createContext(null);

const GrooveProvider = ({ children }) => {
  const [isUserLogIn, setIsUserLogIn] = useState(false);
  const [isMyIconClicked, setIsMyIconClicked] = useState(false);
  const [totalUsersInformation, setTotalUsersInformation] = useState([]);
  const [logInModal, setLogInModal] = useState(false);
  const [nickname, setNickname] = useState("");
  const [nicknameModal, setNicknameModal] = useState(false);
  const [signUpModal, setSignUpModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onNicknameChange = (event) => {
    setNickname(event.target.value);
  };

  const onEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const onPasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const openLogInModal = () => {
    setLogInModal(true);
  };

  const auth = getAuth();
  const [currentUser, setCurrentUser] = useState(auth.currentUser);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("현재user", user.email);
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });
  }, [currentUser, auth]);

  return (
    <GrooveContext.Provider
      value={{
        isUserLogIn,
        setIsUserLogIn,
        isMyIconClicked,
        setIsMyIconClicked,
        totalUsersInformation,
        setTotalUsersInformation,
        logInModal,
        setLogInModal,
        nickname,
        setNickname,
        nicknameModal,
        setNicknameModal,
        onNicknameChange,
        signUpModal,
        setSignUpModal,
        email,
        setEmail,
        password,
        setPassword,
        onEmailChange,
        onPasswordChange,
        openLogInModal,
        currentUser
      }}
    >
      {children}
    </GrooveContext.Provider>
  );
};

export default GrooveProvider;
