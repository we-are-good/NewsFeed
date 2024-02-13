import { Top, StyledLink, ImgWrapBox, ContentWrapBox, Title, Body } from "../../../style/GrooveFeedStyle";

const GrooveFeed = ({ GrooveTop, setGrooveTop }) => {
  return (
    <>
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
              setGrooveTop={setGrooveTop}
            >
              {/* <div key={item.id} onClick={navigate(`/detail/${item.id}`)}> */}
              <ImgWrapBox>
                <img src="" alt="업로드된 이미지"></img>
              </ImgWrapBox>
              <ContentWrapBox>
                <Title>{item.title}</Title>
                <Body>{item.body}</Body>
              </ContentWrapBox>
              {/* </div> */}
            </StyledLink>
          );
        })}
      </Top>
    </>
  );
};

export default GrooveFeed;
