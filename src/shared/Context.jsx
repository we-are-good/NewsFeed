import { createContext, useState } from "react";
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
        openLogInModal
      }}
    >
      {children}
    </GrooveContext.Provider>
  );
};

export default GrooveProvider;
