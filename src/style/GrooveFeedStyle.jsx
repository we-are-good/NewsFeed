import styled from "styled-components";
import { Link } from "react-router-dom";

export const Top = styled.div`
  width: calc((330px * 5) + (1rem * 4));
  /* border: 1px solid red; */
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin: 2rem auto;

  @media (max-width: 1715px) {
    width: calc((330px * 4) + (1rem * 3));
  }
  @media (max-width: 1380px) {
    width: calc((330px * 3) + (1rem * 2));
  }
  @media (max-width: 1040px) {
    width: calc((330px * 2) + (1rem * 1));
  }
  @media (max-width: 690px) {
    width: 100%;
    justify-content: center;
  }
`;
export const StyledLink = styled(Link)`
  display: flex;
  flex-direction: column;
  width: 330px;
  height: 355px;
  padding: 5px;
  /* border: 1px solid red; */
  &:hover > div > img {
    transform: translate(-50%, -50%) scale(1.2);
  }
`;
export const ImgWrapBox = styled.div`
  width: 320px;
  height: 170px;
  border: 1px solid #ffc41d;
  border-radius: 0.5rem;
  position: relative;
  overflow: hidden;
  & > img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    transition: 0.3s;
    width: 100%;
  }
`;
export const ContentWrapBox = styled.div`
  padding: 0.8rem;
  height: calc(100% - 170px);
  display: flex;
  flex-direction: column;
`;
export const Title = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 0.8rem;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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
  color: #ccc;
`;

export const UserLikeBox = styled.div`
  margin-top: auto;
`;
