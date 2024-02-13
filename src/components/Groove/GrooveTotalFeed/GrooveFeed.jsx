import { Top, StyledLink, ImgWrapBox, ContentWrapBox, Title, Body, UserLikeBox } from "../../../style/GrooveFeedStyle";
import GrooveLikeBtn from "./GrooveLikeBtn";

const GrooveFeed = ({ GrooveTop, setGrooveTop }) => {
  const handleLike = (grooveId) => {
    // 좋아요 처리를 위한 로직 추가
    // 여기서는 상태를 직접 업데이트하는 예시 코드입니다.
    const updatedGrooveTop = GrooveTop.map((item) => {
      if (item.id === grooveId) {
        return {
          ...item,
          isLiked: !item.isLiked,
          likeCount: item.isLiked ? item.likeCount - 1 : item.likeCount + 1
        };
      }
      return item;
    });

    setGrooveTop(updatedGrooveTop);
    // 여기에서 Firestore 업데이트 로직을 추가할 수 있습니다.
  };

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
                  <GrooveLikeBtn onClick={() => handleLike(item.id)}>
                    {item.isLiked ? <i className="fa-solid fa-heart" /> : <i className="fa-regular fa-heart" />}
                    {item.likeCount}
                  </GrooveLikeBtn>
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
