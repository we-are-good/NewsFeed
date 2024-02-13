import { Top, StyledLink, ImgWrapBox, ContentWrapBox, Title, Body, UserLikeBox } from "../../../style/GrooveFeedStyle";
import GrooveLikeBtn from "./GrooveLikeBtn";

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
                <img src={item.imageUrl} alt="업로드된 이미지"></img>
              </ImgWrapBox>
              <ContentWrapBox>
                <Title>{item.title}</Title>
                <Body>{item.body}</Body>
                {/* 좋아요 버튼 및 갯수 렌더링 */}
                <UserLikeBox>
                  <p>
                    <i className="fa-solid fa-heart" /> {Object.keys(item.likes || {}).length}개
                  </p>
                </UserLikeBox>
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
