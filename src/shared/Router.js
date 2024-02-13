import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import WritePage from "../pages/WritePage";
import DetailPage from "../pages/DetailPage";
import MyPage from "../pages/MyPage";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { app } from "../firebase";

const Router = () => {
  const auth = getAuth();
  const [currentUser, setCurrentUser] = useState(auth.currentUser);

  // const user = auth.currentUser;
  // console.log("auth->", auth);
  // console.log("user->", user);
  console.log("currentUser------>>>>>", currentUser);
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
  // useEffect(() => {
  //   const auth = getAuth(app);
  //   console.log("auth.currentUser", auth.currentUser);
  // }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home currentUser={currentUser} />} />
        <Route path="/write" element={<WritePage currentUser={currentUser} />} />
        <Route path="/detail/:id" element={<DetailPage currentUser={currentUser} />} />
        <Route path="/mypage" element={<MyPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
