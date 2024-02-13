import React from "react";
import GrooveFeedList from "../components/groove/GrooveTotalFeed/GrooveFeedList";
import GrooveHeader from "../components/groove/GrooveHeader";
import GrooveFooter from "../components/groove/GrooveFooter";
import styled from "styled-components";

function Home() {
  return (
    <Wrapper>
      <GrooveHeader />
      <GrooveFeedList />
      <GrooveFooter />
    </Wrapper>
  );
}

export default Home;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;
