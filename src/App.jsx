import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import GrooveFeedList from "./components/Groove/GrooveTotalFeed/GrooveFeedList";
import FileUpload from "./components/FileUpload";
import LoadFile from "./components/LoadFile";
import GlobalStyle from "./shared/GlobalStyle";
import Home from "./pages/Home";
import Router from "./shared/Router";
import React from "react";
const App = () => {
  // useEffect(() => {
  //   onAuthStateChanged(auth, (user) => {
  //     console.log("user", user); // 사용자 인증 정보가 변경될 때마다 해당 이벤트를 받아 처리합니다.
  //   });
  // }, []);

  return (
    <>
      <GlobalStyle />
      <Router />
      {/* <GrooveAuth /> */}
      {/* <Home /> */}
      {/* <GrooveFeedList /> */}
      {/* <FileUpload /> */}
      {/* <LoadFile /> */}



      {/* <GrooveAuth /> */}

    </>
  );
};

export default App;
