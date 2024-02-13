import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import WritePage from "../pages/WritePage";
import DetailPage from "../pages/DetailPage";
import MyPage from "../pages/MyPage";
import { getAuth } from "firebase/auth";

const Router = () => {
  const auth = getAuth();
  const user = auth.currentUser;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home user={user} />} />
        <Route path="/write" element={<WritePage />} />
        <Route path="/detail/:id" element={<DetailPage />} />
        <Route path="/mypage" element={<MyPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
