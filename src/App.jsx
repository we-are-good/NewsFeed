import React from "react";
import { ToastContainer } from "react-toastify";
import GrooveProvider from "./shared/Context";
import GlobalStyle from "./shared/GlobalStyle";
import Router from "./shared/Router";
const App = () => {
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
