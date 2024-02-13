import styled from "styled-components";

export const OverlayForm = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #15151599;
  backdrop-filter: blur(10px);
  z-index: 1;
`;

export const LogInForm = styled.form`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0px 0px 10px #ffc41d;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: #151515;
  color: #fff;
  padding: 3rem 3rem 4rem 3rem;
  border-radius: 1rem;
  /* border: 0.2rem solid black; */
  height: 500px;
  width: 400px;
  gap: 1rem;
  z-index: 2;
  @media (max-width: 500px) {
    width: 80%;
    padding: 1rem;
    justify-content: space-around;
  }
`;

export const BackgroundLogInButton = styled.button`
  margin-right: 2rem;
  background-color: #ffc41d;
  font-size: 1.2rem;
  font-weight: 600;
  border-radius: 0.4rem;
`;

export const LogSigninButton = styled.button`
  pointer-events: ${(props) => (props.name === "ignore-click" ? "none" : "painted")};
  background-color: transparent;
  border: none;
  cursor: pointer;
  /* width: 5rem; */
  margin: 1rem;
  font-size: 2rem;
  @media (max-width: 500px) {
    font-size: 1.5rem;
  }
  padding-bottom: 5px;
  color: ${(props) => (props.name === "ignore-click" ? "#ffc41d" : "#fff")};
  border-bottom: ${(props) => (props.name === "ignore-click" ? "3px" : "0px")} solid
    ${(props) => (props.name === "ignore-click" ? "#ffc41d" : "#fff")};
`;
export const TopText = styled.div`
  text-align: center;
  & > h3 {
    font-size: 2rem;
    font-weight: 400;
    margin-bottom: 0.2rem;
    color: #eee;
  }
  & > h4 {
    font-size: 1.1rem;
    font-weight: 100;
    color: #ccc;
  }
`;

export const IDPWBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 2rem;
  margin-bottom: 0.5rem;
  & > input {
    width: 100%;
    height: 100%;
    border-radius: 5px;
    padding: 5px;
    border: none;
  }
`;
export const IDPWBoxWrap = styled.div`
  width: 100%;
  /* margin-bottom: 2rem; */
`;

export const LogInButtonsBox = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const LogInSmallButton = styled.button`
  color: #151515;
  background-color: #ffc41d;
  width: 100%;
  height: 2rem;
  font-weight: 600;
  font-size: 0.8rem;
  border-radius: 5px;
  margin: 1rem 0;
  border: none;
  cursor: pointer;
`;

export const PromptLogIn = styled.button`
  width: 100%;
  height: 1.5rem;
  overflow: hidden;
  cursor: pointer;
`;

export const GoogleGitLogIn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.8rem;
  width: 100%;
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
