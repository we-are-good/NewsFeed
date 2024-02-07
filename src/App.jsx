import { useEffect } from "react";
import GrooveAuth from "./components/Groove/GrooveAuth";
import { app } from "./firebase";

function App() {
  useEffect(() => {
    console.log("app", app);
  });
  return (
    <>
      <GrooveAuth />
    </>
  );
}

export default App;
