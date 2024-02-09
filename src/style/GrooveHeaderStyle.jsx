import styled from "styled-components";

export const GrooveHeaderWrap = styled.header`
  width: 100%;
  height: 4rem;
  display: flex;
  align-items: center;
  padding: 1rem;
  box-shadow: 0 0 5px #151515cc;
`;
export const GrooveHeaderLogo = styled.h1`
  font-size: 2rem;
  font-weight: 600;
`;
export const GrooveHeaderIconWrap = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
  & > button {
    margin-left: 0.6rem;
    width: 24px;
    height: 24px;
    border: 1px solid #222;
    background-color: transparent;
    border-radius: 50%;
    overflow: hidden;
    cursor: pointer;
  }
  & > button:nth-child(1) {
    margin-left: 0;
  }
`;
export const GrooveHeaderIconHome = styled.button``;
export const GrooveHeaderIconWrite = styled.button``;
export const GrooveHeaderIconMy = styled.button`
  position: relative;

  &::before {
    content: "";
    position: absolute;
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    top: 20%;
    left: 50%;
    transform: translate(-50%, 0%);
    background-color: #222;
  }
  &::after {
    content: "";
    position: absolute;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    bottom: -30%;
    left: 50%;
    transform: translate(-50%, 0%);
    background-color: #222;
  }
`;
