import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import WritePage from "../pages/WritePage";
import DetailPage from "../pages/DetailPage";
import MyPage from "../pages/MyPage";
import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";

const Router = () => {
  const [isUserLogIn, setIsUserLogIn] = useState(false);
  const [isMyIconClicked, setIsMyIconClicked] = useState(false);
  const [totalUsersInformation, setTotalUsersInformation] = useState([]);
  const [logInModal, setLogInModal] = useState(false);
  const [nickname, setNickname] = useState("");
  const [nicknameModal, setNicknameModal] = useState(false);

  const onNicknameChange = (event) => {
    setNickname(event.target.value);
  };

  const auth = getAuth();
  const [currentUser, setCurrentUser] = useState(auth.currentUser);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        console.log("현재user", user);
        setCurrentUser(user);
      } else {
        console.log("유저없음");
        setCurrentUser(null);
      }
    });
  }, [currentUser]);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              nickname={nickname}
              setNickname={setNickname}
              currentUser={currentUser}
              isUserLogIn={isUserLogIn}
              setIsUserLogIn={setIsUserLogIn}
              isMyIconClicked={isMyIconClicked}
              setIsMyIconClicked={setIsMyIconClicked}
              setTotalUsersInformation={setTotalUsersInformation}
              logInModal={logInModal}
              setLogInModal={setLogInModal}
              nicknameModal={nicknameModal}
              setNicknameModal={setNicknameModal}
              onNicknameChange={onNicknameChange}
            />
          }
        />
        <Route
          path="/write"
          element={
            <WritePage
              nickname={nickname}
              setNickname={setNickname}
              currentUser={currentUser}
              isUserLogIn={isUserLogIn}
              setIsUserLogIn={setIsUserLogIn}
              isMyIconClicked={isMyIconClicked}
              setIsMyIconClicked={setIsMyIconClicked}
              setTotalUsersInformation={setTotalUsersInformation}
              logInModal={logInModal}
              setLogInModal={setLogInModal}
              nicknameModal={nicknameModal}
              setNicknameModal={setNicknameModal}
              onNicknameChange={onNicknameChange}
            />
          }
        />
        <Route
          path="/detail/:id"
          element={
            <DetailPage
              nickname={nickname}
              setNickname={setNickname}
              currentUser={currentUser}
              isUserLogIn={isUserLogIn}
              setIsUserLogIn={setIsUserLogIn}
              isMyIconClicked={isMyIconClicked}
              setIsMyIconClicked={setIsMyIconClicked}
              setTotalUsersInformation={setTotalUsersInformation}
              logInModal={logInModal}
              setLogInModal={setLogInModal}
              nicknameModal={nicknameModal}
              setNicknameModal={setNicknameModal}
              onNicknameChange={onNicknameChange}
            />
          }
        />
        <Route
          path="/mypage"
          element={
            <MyPage
              nickname={nickname}
              setNickname={setNickname}
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
              isUserLogIn={isUserLogIn}
              setIsUserLogIn={setIsUserLogIn}
              isMyIconClicked={isMyIconClicked}
              setIsMyIconClicked={setIsMyIconClicked}
              setTotalUsersInformation={setTotalUsersInformation}
              logInModal={logInModal}
              setLogInModal={setLogInModal}
              nicknameModal={nicknameModal}
              setNicknameModal={setNicknameModal}
              onNicknameChange={onNicknameChange}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
