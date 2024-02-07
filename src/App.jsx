import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import GrooveAuth from "./components/Groove/GrooveAuth";
import GrooveFeedList from "./components/Groove/GrooveTotalFeed/GrooveFeedList";
import FileUpload from "./components/FileUpload";

const App = () => {
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log("user", user); // 사용자 인증 정보가 변경될 때마다 해당 이벤트를 받아 처리합니다.
    });
  }, []);

  return (
    <div className="App">
      <GrooveAuth />
      <GrooveFeedList />
      <FileUpload />
    </div>
  );
};

export default App;
