import styled from "styled-components";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
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
  width: 500px;
  resize: none;
`;
