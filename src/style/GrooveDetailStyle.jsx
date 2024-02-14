// import styled from "styled-components";
import styled, { keyframes } from "styled-components";

export const EditingWrap = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  align-items: center;
  & > img {
    max-width: 600px;
    margin-bottom: 1rem;
    @media (max-width: 700px) {
      max-width: 90%;
    }
  }
  & > div {
    margin-bottom: 1rem;
  }
`;

export const EditingButtonWrap = styled.div`
  width: 60%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  & > span {
    margin-right: auto;
    font-size: 12px;
    font-weight: 200;
    color: #ccc;
  }
  @media (max-width: 1280px) {
    width: 80%;
  }
  & > button {
    border-radius: 5px;
    border: none;
    padding: 5px 10px;
    margin-left: 0.5rem;
    font-size: 1rem;
    cursor: pointer;
  }
  & > button:nth-of-type(1) {
    background-color: rgba(65, 105, 225, 0.5);
    color: #eee;
  }
  & > button:nth-of-type(2) {
    background-color: rgba(255, 99, 71, 0.5);
    color: #eee;
  }
  & > button:hover:nth-of-type(1) {
    background-color: rgba(65, 105, 225, 1);
    color: #eee;
  }
  & > button:hover:nth-of-type(2) {
    background-color: rgba(255, 99, 71, 1);
    color: #eee;
  }
`;

export const Wrap = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 2rem;
  & > img {
    max-width: 600px;
    margin-bottom: 1rem;
    @media (max-width: 700px) {
      max-width: 90%;
    }
  }
  & > div {
    margin-bottom: 1rem;
  }
`;
export const Title = styled.div`
  font-size: 1.8rem;
  display: flex;
  margin-top: 12px;
  line-height: normal;
  width: 60%;
  & > input {
    width: 100%;
    padding: 0.5rem;
    font-size: 1rem;
  }
  & > input::placeholder {
  }
  @media (max-width: 1280px) {
    width: 80%;
  }
`;
export const Body = styled.div`
  display: flex;
  margin-top: 12px;
  margin-bottom: 12px;
  font-size: 1rem;
  line-height: normal;
  width: 60%;
  @media (max-width: 1280px) {
    width: 80%;
  }
`;

const pangpang = keyframes`
0% {
    background-position: 5% 90%, 10% 90%, 10% 90%, 15% 90%, 25% 90%, 25% 90%,
      40% 90%, 55% 90%, 70% 90%;
  }

  50% {
    background-position: 0% 80%, 0% 20%, 10% 40%, 20% 0%, 30% 30%, 22% 50%,
      50% 50%, 65% 20%, 90% 30%;
  }

  100% {
    background-position: 0% 70%, 0% 10%, 10% 30%, 20% -10%, 30% 20%, 22% 40%,
      50% 40%, 65% 10%, 90% 20%;
    background-size: 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%;
  }
`;
const pangpangbot = keyframes`
0% {
    background-position: 10% -10%, 30% 10%, 55% -10%, 70% -10%, 85% -10%,
      70% -10%, 70% 0%;
  }

  50% {
    background-position: 0% 80%, 20% 80%, 45% 60%, 60% 100%, 75% 70%, 95% 60%,
      105% 0%;
  }

  100% {
    background-position: 0% 90%, 20% 90%, 45% 70%, 60% 110%, 75% 80%, 95% 70%,
      110% 10%;
    background-size: 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%;
  }`;
export const LikeWrap = styled.div`
  display: flex;
  align-items: center;
  width: 60%;
  font-size: 0.9rem;
  font-weight: 200;
  color: #ccc;
  gap: 12px;
  margin-bottom: 12px;
  @media (max-width: 1280px) {
    width: 80%;
  }
  & > span {
    margin-right: auto;
  }
  & > p {
  }
  & > button {
    cursor: pointer;
    color: #ffc41d;
    background-color: transparent;
    border: 0px;
    position: relative;
    &:hover {
      /* filter: brightness(50%); */
    }

    transition: all 0.2s ease;

    &::before,
    &::after {
      position: absolute;
      content: "";
      width: 150%;
      left: 50%;
      top: 50%;
      height: 150%;
      transform: translate(-50%, -30%);
      z-index: -1000;
      background-repeat: no-repeat;
    }
    &:active::before {
      top: -50%;
      background-image: radial-gradient(circle, #ffc41d 20%, transparent 20%),
        radial-gradient(circle, transparent 20%, #ffc41d 20%, transparent 30%),
        radial-gradient(circle, #ffc41d 20%, transparent 20%), radial-gradient(circle, #ffc41d 20%, transparent 20%),
        radial-gradient(circle, transparent 10%, #ffc41d 15%, transparent 20%),
        radial-gradient(circle, #ffc41d 20%, transparent 20%), radial-gradient(circle, #ffc41d 20%, transparent 20%),
        radial-gradient(circle, #ffc41d 20%, transparent 20%), radial-gradient(circle, #ffc41d 20%, transparent 20%);
      background-size: 10% 10%, 20% 20%, 15% 15%, 20% 20%, 18% 18%, 10% 10%, 15% 15%, 10% 10%, 18% 18%;
      background-position: 20% 100%;
      animation: ${pangpang} 0.4s ease;
    }
    &:active::after {
      bottom: -50%;
      background-image: radial-gradient(circle, #ffc41d 20%, transparent 20%),
        radial-gradient(circle, #ffc41d 20%, transparent 20%),
        radial-gradient(circle, transparent 10%, #ffc41d 15%, transparent 20%),
        radial-gradient(circle, #ffc41d 20%, transparent 20%), radial-gradient(circle, #ffc41d 20%, transparent 20%),
        radial-gradient(circle, #ffc41d 20%, transparent 20%), radial-gradient(circle, #ffc41d 20%, transparent 20%);
      background-size: 15% 15%, 20% 20%, 18% 18%, 20% 20%, 15% 15%, 20% 20%, 18% 18%;
      background-position: 30% 0%;
      animation: ${pangpangbot} 0.3s ease;
    }
  }
`;

export const NoneLoggedLike = styled.div`
  display: flex;
  align-items: center;
  width: 60%;
  font-size: 0.9rem;
  font-weight: 200;
  color: #ccc;
  gap: 12px;
  margin-bottom: 12px;
  @media (max-width: 1280px) {
    width: 80%;
  }
  & > span {
    margin-right: auto;
  }
`;
export const DetailEdit = styled.div`
  width: 60%;
  display: flex;
  justify-content: flex-end;
  @media (max-width: 1280px) {
    width: 80%;
  }
  & > button {
    border-radius: 5px;
    border: none;
    padding: 5px 10px;
    margin-left: 0.5rem;
    font-size: 1rem;
    cursor: pointer;
  }
  & > button:nth-of-type(1) {
    background-color: rgba(65, 105, 225, 0.5);
    color: #eee;
  }
  & > button:nth-of-type(2) {
    background-color: rgba(255, 99, 71, 0.5);
    color: #eee;
  }
  & > button:hover:nth-of-type(1) {
    background-color: rgba(65, 105, 225, 1);
    color: #eee;
  }
  & > button:hover:nth-of-type(2) {
    background-color: rgba(255, 99, 71, 1);
    color: #eee;
  }
`;
