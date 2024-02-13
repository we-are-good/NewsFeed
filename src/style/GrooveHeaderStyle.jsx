import styled from "styled-components";

export const GrooveHeaderWrap = styled.header`
  width: 100%;
  height: 4rem;
  display: flex;
  align-items: center;
  padding: 1rem;
  background-color: #151515;
  box-shadow: 0 0 10px #000;
  color: #fff;
`;
export const GrooveHeaderLogo = styled.h1`
  font-size: 2rem;
  font-weight: 600;
  cursor: pointer;
  color: #ffc41d;
`;
export const GrooveHeaderIconWrap = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
  & > button {
    margin-left: 0.6rem;
    width: 2rem;
    height: 2rem;
    border: 0;
    background-color: transparent;
    border-radius: 50%;
    overflow: hidden;
    cursor: pointer;
    position: relative;
    &:hover > i {
      color: #ffc41d;
    }
    & > i {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: #fff;
      font-size: 1.2rem;
    }
  }
  & > button:nth-child(1) {
    margin-left: 0;
  }
`;
export const GrooveHeaderIconHome = styled.button`
  display: flex;
`;
export const GrooveHeaderIconWrite = styled.button``;
export const GrooveHeaderIconMy = styled.button``;
export const GrooveHeaderIcons = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
  margin-right: 3.5rem;
`;
export const GrooveHeaderIconSelection = styled.div`
  position: absolute;
  top: 3.2rem;
  right: 3.2rem;
  display: flex;
  flex-direction: column;
  align-content: center;
  font-size: 1.2rem;
  gap: 0.3rem;
  & > button {
    background-color: #ffc41d;
    font-size: 0.8rem;
    font-weight: 600;
    border-radius: 0.4rem;
  }
`;
