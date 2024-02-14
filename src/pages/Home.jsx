import React from "react";
import GrooveFeedList from "../components/Groove/GrooveTotalFeed/GrooveFeedList";
import GrooveHeader from "../components/Groove/GrooveHeader";
import GrooveFooter from "../components/Groove/GrooveFooter";
import styled from "styled-components";

function Home({
  isUserLogIn,
  currentUser,
  isMyIconClicked,
  setIsMyIconClicked,
  setIsUserLogIn,
  setTotalUsersInformation,
  logInModal,
  setLogInModal,
  nickname,
  setNickname,
  nicknameModal,
  setNicknameModal,
  onNicknameChange
}) {
  return (
    <Wrapper>
      <GrooveHeader
        nickname={nickname}
        setNickname={setNickname}
        currentUser={currentUser}
        isUserLogIn={isUserLogIn}
        setIsUserLogIn={setIsUserLogIn}
        isMyIconClicked={isMyIconClicked}
        setIsMyIconClicked={setIsMyIconClicked}
        setTotalUsersInformation={setTotalUsersInformation}
        logInModal={logInModal}
        setLogInModal={setLogInModal}
        nicknameModal={nicknameModal}
        setNicknameModal={setNicknameModal}
        onNicknameChange={onNicknameChange}
      />
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
