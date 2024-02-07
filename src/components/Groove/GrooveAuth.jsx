import React from "react";
import { Navigate } from "react-router-dom";
import { useState } from "react";
import styled from "styled-components";

function GrooveAuth() {
  const [logInActive, setlogInActive] = useState(false);
  const [activeName, setActiveName] = useState("Log in");
  const [nickName, setNickName] = useState("");
  const [password, setPassword] = useState("");

  const onNickNameChange = (event) => {
    setNickName(event.target.value);
  };
  const onPasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const openLogInModal = () => {
    setlogInActive(true);
  };
  const closeLogInModal = () => {
    setlogInActive(false);
  };

  const LogInForm = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: white;
    border: 0.2rem solid black;
    height: 20rem;
    width: 15rem;
    gap: 1rem;
  `;

  const LogSigninButton = styled.button`
    background-color: transparent;
    border: none;
    width: 5rem;
    font-size: 1.2rem;
  `;

  const IDPWBox = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 12rem;
  `;

  const LogInButtonsBox = styled.div`
    display: flex;
    flex-direction: row;
    gap: 1rem;

    align-items: center;
    justify-content: center;
    width: 12rem;
    padding: 0rem 2rem;
  `;

  const LogInSmallButton = styled.button`
    color: black;
    background-color: yellow;
    width: 4rem;
    height: 1.5rem;
    font-size: 0.8rem;
    border-radius: 3rem;
  `;

  const PromptLogIn = styled.button`
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    overflow: hidden;
  `;

  const LogInPromptButton = styled.button`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 15rem;
    gap: 0.8rem;
    background-color: white;
    border: none;
  `;

  return (
    <div>
      <button onClick={openLogInModal}>Log in</button>
      <div>
        <div>
          <LogInForm>
            <div>
              <LogSigninButton name="activeName">Log in</LogSigninButton>
              <LogSigninButton name="activeName">Sign in</LogSigninButton>
            </div>
            <IDPWBox>
              <input placeholder="ID" type="text" name="nickName" value={nickName} onChange={onNickNameChange} />
            </IDPWBox>
            <IDPWBox>
              <input
                placeholder="PASSWORD"
                type="password"
                name="password"
                value={password}
                onChange={onPasswordChange}
              />
            </IDPWBox>
            <LogInButtonsBox>
              <LogInSmallButton>Log in</LogInSmallButton>
            </LogInButtonsBox>

            <div>or sign up with</div>

            <LogInPromptButton>
              <PromptLogIn>Google</PromptLogIn>
              <PromptLogIn>Git</PromptLogIn>
            </LogInPromptButton>
          </LogInForm>
        </div>
      </div>
    </div>
  );
}

export default GrooveAuth;
