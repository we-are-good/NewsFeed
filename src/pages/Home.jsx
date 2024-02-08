import React from "react";
import GrooveFeedList from "../components/Groove/GrooveTotalFeed/GrooveFeedList";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  return (
    <div>
      <button onClick={() => navigate("/write")}>글 작성하러가기 </button>
      <GrooveFeedList />
    </div>
  );
}

export default Home;
