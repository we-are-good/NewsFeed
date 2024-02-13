import styled from "styled-components";
import { Link } from "react-router-dom";

export const Top = styled.div`
  width: 100%;
  border: 1px solid red;
  display: flex;
  justify-content: center;
  gap: 10px;
  flex-wrap: wrap;
`;
export const StyledLink = styled(Link)`
  background-color: gray;
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  width: 17%;
  height: 500px;
`;
export const Title = styled.div`
  color: green;
`;
export const Body = styled.div`
  color: yellow;
`;
