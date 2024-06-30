import React from "react";
import { ToastContainer } from "react-toastify";
import GrooveProvider from "./shared/Context";
import GlobalStyle from "./shared/GlobalStyle";
import Router from "./shared/Router";
const App = () => {
  // useEffect(() => {
  //   onAuthStateChanged(auth, (user) => {
  //     console.log("user", user); // 사용자 인증 정보가 변경될 때마다 해당 이벤트를 받아 처리합니다.
  //   });
  // }, []);

  return (
    <div>
      <GrooveProvider>
        <ToastContainer
          style={{
            backgroundColor: "rgba(0,0,0,0.8",
            color: "#ffffff",
            minWidth: "350px",
            margin: "0",
            padding: "5px",
            textAlign: "center"
          }}
        />
        <GlobalStyle />
        <Router />
      </GrooveProvider>
    </div>
  );
};

export default App;
