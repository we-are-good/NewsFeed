import styled from "styled-components";
import { Link } from "react-router-dom";
const Top = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;
const StyledLink = styled(Link)`
  background-color: gray;
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  width: 17%;
  height: 500px;
`;
const Title = styled.div`
  color: green;
`;
const Body = styled.div`
  color: yellow;
`;
const GrooveFeed = ({ GrooveTop }) => {
  return (
    <>
      <>
        //////////////////////////////////////////////////////////////////////////////////////////피드영역//////////////////////////////////////////////////////////////////////////////////////////
      </>
      <Top>
        {GrooveTop.map((item) => {
          return (
            // 여기서 item은 Firestore Database의 문서!
            // <StyledLink to={`/detail/${item.id}`} key={item.id}>
            <StyledLink
              key={item.id}
              to={{
                pathname: `/detail/${item.id}`
              }}
              state={GrooveTop}
            >
              {/* <div key={item.id} onClick={navigate(`/detail/${item.id}`)}> */}
              <img src="" alt="업로드된 이미지"></img>
              <Title>제목 :{item.title}</Title>
              <Body>내용 :{item.body}</Body>
              {/* </div> */}
            </StyledLink>
          );
        })}
      </Top>
      <>
        //////////////////////////////////////////////////////////////////////////////////////////피드영역//////////////////////////////////////////////////////////////////////////////////////////
      </>
    </>
  );
};

export default GrooveFeed;
