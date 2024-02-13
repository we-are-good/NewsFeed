import React from "react";
import GrooveFeedList from "../components/Groove/GrooveTotalFeed/GrooveFeedList";
import { useNavigate } from "react-router-dom";
import GrooveHeader from "../components/Groove/GrooveHeader";
import GrooveFooter from "../components/Groove/GrooveFooter";

function Home() {
  const navigate = useNavigate();
  return (
    <div>
      <GrooveHeader />
      <GrooveFeedList />
      <GrooveFooter />
    </div>
  );
}

export default Home;
