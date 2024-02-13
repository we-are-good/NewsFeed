import { getAuth } from "firebase/auth";
import React, { createContext, useState } from "react";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../../firebase";

export const GrooveContext = createContext(null);

const GrooveLogInUserProvider = ({ children }) => {
  const [socialLogInModal, setSocialLogInModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");

  const auth = getAuth();
  const user = auth.currentUser;

  const [totalUsersInformation, setTotalUsersInformation] = useState([]);
  const [isUserLogIn, setIsUserLogIn] = useState(false);
  const [logInModal, setLogInModal] = useState(false);

  //이 함수를 실행하면 nickname이 추출됩니다.
  const nowUserInformation = () => {
    const fetchData = async (userEmail) => {
      const q = query(collection(db, "logInData"));
      const querySnapshot = await getDocs(q);

      const totalUsersInformation = await querySnapshot.docs.map((doc) => ({
        email: doc.data().email,
        nickname: doc.data().nickname
      }));
      setTotalUsersInformation(totalUsersInformation);
      console.log(totalUsersInformation);
      const nowLogIn = await totalUsersInformation.find((information) => information.email === userEmail);
      if (!nowLogIn) {
        return;
      }
      setNickname(nowLogIn.nickname);
      if (!totalUsersInformation) return;
    };

    if (user) {
      console.log("user", user);
      //현재 로그인중인 유저가 있는지 확인합니다.
      const userEmail = user.email;
      setIsUserLogIn(true);
      setLogInModal(false);
      fetchData(userEmail);
    } else {
      console.log("user in else", user);
    }
  };

  return (
    <GrooveContext.Provider
      value={{
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
        totalUsersInformation,
        setTotalUsersInformation,
        isUserLogIn,
        setIsUserLogIn,
        logInModal,
        setLogInModal,
        nowUserInformation
      }}
    >
      {children}
    </GrooveContext.Provider>
  );
};

export default GrooveLogInUserProvider;
