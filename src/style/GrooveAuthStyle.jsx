import styled from "styled-components";

export const OverlayForm = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.7);
`;

export const LogInForm = styled.form`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 1001;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  border: 0.2rem solid black;
  height: 20rem;
  width: 15rem;
  gap: 1rem;
  z-index: 1;
`;

export const LogSigninButton = styled.button`
  pointer-events: ${(props) => (props.name === "ignore-click" ? "none" : "painted")};
  background-color: ${(props) => (props.name === "ignore-click" ? "yellow" : "transparent")};
  border: none;
  width: 5rem;
  font-size: 1.2rem;
`;

export const IDPWBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 12rem;
`;

export const LogInButtonsBox = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;

  align-items: center;
  justify-content: center;
  width: 12rem;
  padding: 0rem 2rem;
`;

export const LogInSmallButton = styled.button`
  color: black;
  background-color: yellow;
  width: 4rem;
  height: 1.5rem;
  font-size: 0.8rem;
  border-radius: 3rem;
`;

export const PromptLogIn = styled.button`
  width: 12rem;
  height: 1.5rem;
  overflow: hidden;
`;

export const GoogleGitLogIn = styled.footer`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.8rem;
`;

export const SocialLogInNickname = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 1001;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: white;
  border: 0.2rem solid black;
  height: 5rem;
  width: 17rem;
  gap: 1rem;
`;
