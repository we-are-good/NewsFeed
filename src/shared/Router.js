import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import WritePage from "../pages/WritePage";
import DetailPage from "../pages/DetailPage";
import MyPage from "../pages/MyPage";
import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";

const Router = () => {
  const auth = getAuth();
  const [currentUser, setCurrentUser] = useState(auth.currentUser);

  // const user = auth.currentUser;
  // console.log("auth->", auth);
  // console.log("user->", user);
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
        <Route path="/" element={<Home currentUser={currentUser} />} />
        <Route path="/write" element={<WritePage currentUser={currentUser} />} />
        <Route path="/detail/:id" element={<DetailPage />} />
        <Route path="/mypage" element={<MyPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
