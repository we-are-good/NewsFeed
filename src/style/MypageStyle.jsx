import { Link } from "react-router-dom";
import styled from "styled-components";

export const StDivWrap = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  min-height: 100vh;
  padding: 2rem;
`;
export const StDiv = styled.div`
  display: flex;
  /* justify-content: center; */
  align-items: center;
  flex-direction: column;
`;

export const StUserContainer = styled.div`
  width: 400px;
  margin: 1rem;
  line-height: 1.5;
  & > p {
    border-bottom: 1px solid #ffc41d;
    padding-bottom: 10px;
    margin-bottom: 10px;
  }
  & > section {
    position: relative;
    text-align: center;
  }
  & > section > img {
    max-width: 400px;
  }
`;

export const EditProfileImage = styled.div`
  position: absolute;
  bottom: 10%;
  left: 50%;
  transform: translate(-50%, 0);
  & > button {
    font-size: 1rem;
    border: 1px solid #ffc41d;
    background-color: #ffc41daa;
    font-weight: 500;
    border-radius: 5px;
    cursor: pointer;
    &:hover {
      background-color: #ffc41d;
      color: #212121;
    }
  }
`;

export const EditProfileImageChange = styled.div`
  display: flex;
  margin-bottom: 1rem;

  & > input[type="file"] {
    margin-right: auto;
    &::file-selector-button {
      border-radius: 5px;
      border: none;
      padding: 5px 10px;
      margin-left: 0.5rem;
      font-size: 0.8rem;
      cursor: pointer;
      background-color: #eeeeee66;
    }
    &::file-selector-button:hover {
      background-color: #eeeeeeee;
    }
  }
  & > button {
    border-radius: 5px;
    border: none;
    padding: 5px 10px;
    margin-left: 0.5rem;
    font-size: 0.8rem;
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

export const StInfo = styled.p`
  display: flex;
  text-align: center;
  justify-content: center;
  font-size: 20px;
  font-weight: bold;
`;

export const StNickname = styled.p`
  justify-content: space-between;
  display: flex;
  align-items: center;
`;

export const StNicknameEdit = styled.p`
  display: flex;
  margin: 1rem 0;
  & > button {
    border-radius: 5px;
    border: none;
    padding: 5px 10px;
    margin-left: 0.5rem;
    font-size: 0.8rem;
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

export const StyledMessage = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 25px;
  color: #ffff;
`;

export const StUl = styled.ul`
  margin-top: 20px;
  width: 1280px;
`;

export const StInput = styled.input`
  margin-left: 5px;
  border-color: #ffc41d;
  background-color: transparent;
  border-radius: 5px;
  margin-right: auto;
  color: #eee;
`;

export const StEditbtn = styled.button`
  background-color: transparent;
  border: none;
  color: #ffc41d;
  cursor: pointer;
  &:hover {
    filter: brightness(70%);
  }
  margin-left: auto;
`;

export const StPostLink = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #ffff;
  border-bottom: 2px solid #ffc41d;
  padding-bottom: 10px;
  margin-bottom: 20px;
`;

export const StImage = styled.img`
  height: 100%;
  object-fit: cover;
`;

export const StTitle = styled.p`
  font-size: 20px;
  margin-bottom: 15px;
  font-weight: bold;
`;

export const StImageWrapper = styled.article`
  width: 200px;
  height: 200px;
  overflow: hidden;
  margin-left: 20px;
  & > img {
    width: 100%;
  }
`;

export const StPostContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  & > div {
    width: calc(100% - 220px);
    display: flex;
    flex-direction: column;
    height: 200px;
  }
  & > div > div {
    margin-top: auto;
  }
  & > div > div > p:nth-of-type(1) {
    margin-bottom: 0.5rem;
    font-size: 14px;
    font-weight: 200;
    color: #ccc;
  }
`;

export const StContent = styled.p`
  font-size: 16px;
  margin-bottom: 1rem;
`;
