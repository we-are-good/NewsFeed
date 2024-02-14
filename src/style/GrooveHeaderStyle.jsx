import styled from "styled-components";

export const GrooveHeaderWrap = styled.header`
  width: 100%;
  height: 4rem;
  padding: 1rem;
`;
export const GrooveHeaderFixed = styled.div`
  position: fixed;
  width: 100%;
  height: 4rem;
  display: flex;
  align-items: center;
  padding: 1rem;
  background-color: #151515;
  box-shadow: 0 0 10px #000;
  color: #fff;
  top: 0%;
  left: 0%;
  z-index: 10;
  transition: all 0.5s;
  &.scrolled-header {
    background-color: #151515dd;
    top: 0.5rem;
    width: calc(100% - 1rem);
    left: 0.5rem;
    border-radius: 10px;
    box-shadow: 0 0 20px #000;
  }
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
  & > div > button {
    /* margin-left: 0.6rem; */
    width: 2rem;
    height: 2rem;
    border: 0;
    background-color: #333;
    border-radius: 5px;
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
  gap: 0.7rem;
  /* margin-right: 3.5rem; */
`;
export const GrooveHeaderIconSelection = styled.div`
  position: absolute;
  top: 75px;
  right: 12px;
  display: flex;
  flex-direction: column;
  align-content: center;
  gap: 0.5rem;
  z-index: 1;
  & > button {
    background-color: #333;
    height: 1.5rem;
    font-weight: 500;
    font-size: 14px;
    padding: 0 10px;
    border-radius: 5px;
    color: #eee;
    border: none;
    cursor: pointer;
    &:hover {
      background-color: #ffc41d;
      color: #333;
    }
  }
`;

export const TopBtn = styled.span`
  display: none;
  &.scroll-to-top {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    position: fixed;
    right: 4rem;
    bottom: 4rem;
    background-color: aliceblue;
    color: #212121;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    z-index: 1;
    &:hover {
      background-color: #ffc41d;
    }
  }
`;
