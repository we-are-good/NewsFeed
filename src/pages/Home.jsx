import React from "react";
import GrooveFooter from "../components/Groove/GrooveFooter";
import GrooveHeader from "../components/Groove/GrooveHeader";
import GrooveFeedList from "../components/Groove/GrooveTotalFeed/GrooveFeedList";
import { HomeWrapper } from "../style/HomeStyle";

function Home() {
  return (
    <HomeWrapper>
      <GrooveHeader />
      <GrooveFeedList />
      <GrooveFooter />
    </HomeWrapper>
  );
}

export default Home;
