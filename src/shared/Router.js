import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import WritePage from "../pages/WritePage";
import MyPage from "../pages/MyPage";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/write" element={<WritePage />} />
        <Route path="/mypage" element={<MyPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
