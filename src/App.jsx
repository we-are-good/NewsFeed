import { useEffect } from "react";
import { app } from "./firebase";

function App() {
  useEffect(() => {
    console.log("app", app);
  }, []);
  return (
    <div className="App">
      <h1>Learn Firebase</h1>
    </div>
  );
}

export default App;
