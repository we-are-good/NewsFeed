import styled from "styled-components";

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
    /* width: 2rem;
      height: 2rem; */
    cursor: pointer;
    color: #ffc41d;
    background-color: transparent;
    border: 0px;
    &:hover {
      filter: brightness(50%);
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
