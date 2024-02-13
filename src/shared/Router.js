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

  const auth = getAuth();
  const [currentUser, setCurrentUser] = useState(auth.currentUser);
  console.log("currentUser------>>>>>", currentUser);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        console.log(user);
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
              currentUser={currentUser}
              isUserLogIn={isUserLogIn}
              setIsUserLogIn={setIsUserLogIn}
              isMyIconClicked={isMyIconClicked}
              setIsMyIconClicked={setIsMyIconClicked}
              setTotalUsersInformation={setTotalUsersInformation}
              logInModal={logInModal}
              setLogInModal={setLogInModal}
            />
          }
        />
        <Route
          path="/write"
          element={
            <WritePage
              currentUser={currentUser}
              isUserLogIn={isUserLogIn}
              setIsUserLogIn={setIsUserLogIn}
              isMyIconClicked={isMyIconClicked}
              setIsMyIconClicked={setIsMyIconClicked}
              setTotalUsersInformation={setTotalUsersInformation}
              logInModal={logInModal}
              setLogInModal={setLogInModal}
            />
          }
        />
        <Route
          path="/detail/:id"
          element={
            <DetailPage
              currentUser={currentUser}
              isUserLogIn={isUserLogIn}
              setIsUserLogIn={setIsUserLogIn}
              isMyIconClicked={isMyIconClicked}
              setIsMyIconClicked={setIsMyIconClicked}
              setTotalUsersInformation={setTotalUsersInformation}
              logInModal={logInModal}
              setLogInModal={setLogInModal}
            />
          }
        />
        <Route
          path="/mypage"
          element={
            <MyPage
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
              isUserLogIn={isUserLogIn}
              setIsUserLogIn={setIsUserLogIn}
              isMyIconClicked={isMyIconClicked}
              setIsMyIconClicked={setIsMyIconClicked}
              setTotalUsersInformation={setTotalUsersInformation}
              logInModal={logInModal}
              setLogInModal={setLogInModal}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
