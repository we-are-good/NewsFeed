import styled from "styled-components";
import { Link } from "react-router-dom";

export const Top = styled.div`
  width: calc(100%);
  border: 1px solid red;
  display: flex;
  justify-content: center;
  gap: 10px;
  flex-wrap: wrap;
  margin: 1rem 0;
`;
export const StyledLink = styled(Link)`
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  width: 330px;
  height: 355px;
  padding: 5px;
  border: 1px solid red;
  &:hover > div > img {
    transform: translate(-50%, -50%) scale(1.2);
  }
`;
export const ImgWrapBox = styled.div`
  width: 320px;
  height: 170px;
  border: 1px solid blue;
  border-radius: 0.5rem;
  position: relative;
  overflow: hidden;
  & > img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    transition: 0.3s;
  }
`;
export const ContentWrapBox = styled.div`
  padding: 0.8rem;
`;
export const Title = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 0.8rem;
  font-weight: 600;
`;
export const Body = styled.p`
  white-space: normal;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 14px;
  font-weight: 300;
  line-height: 1.3em;
`;
