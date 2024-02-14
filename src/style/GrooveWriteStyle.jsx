import styled from "styled-components";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  & > div {
    margin-bottom: 1rem;
  }
  & > img {
    width: 300px;
    margin-bottom: 12px;
  }
`;
export const FormTitle = styled.div`
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
export const FormBody = styled.div`
  width: 60%;
  @media (max-width: 1280px) {
    width: 80%;
  }
`;
export const FormEditingBtnWrap = styled.div`
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
// https://webdir.tistory.com/435 침조
export const FileBox = styled.div`
  display: inline-block;
  padding: 0.5em 0.75em;
  color: #000;
  font-size: inherit;
  line-height: normal;
  vertical-align: middle;
  background-color: #fdfdfd;
  cursor: pointer;
  border: 1px solid #ebebeb;
  border-bottom-color: #e2e2e2;
  border-radius: 0.25em;
`;
// https://webdir.tistory.com/435 침조
export const Input = styled.input`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
`;

export const TextArea = styled.textarea`
  width: 100%;
  padding: 0.5rem;

  resize: none;
  height: 6rem;
  font-size: 1rem;
`;
