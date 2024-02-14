import { useEffect, useState } from "react";
import { Top, StyledLink, ImgWrapBox, ContentWrapBox, Title, Body, UserLikeBox } from "../../../style/GrooveFeedStyle";
import { format } from "date-fns";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { app } from "../../../firebase";
import defaultImage from "../../../assets/defaultImage.jpg";

const GrooveFeed = ({ GrooveTop }) => {
  const [loginData, setLoginData] = useState([]);
  useEffect(() => {
    const fetchLoginData = async () => {
      try {
        const db = getFirestore(app);
        const loginDataCollection = collection(db, "logInData");
        const snapshot = await getDocs(loginDataCollection);
        const loginDataArray = [];

        snapshot.forEach((doc) => {
          const data = doc.data();
          loginDataArray.push({
            id: doc.id,
            email: data.email,
            nickname: data.nickname
          });
        });
        setLoginData(loginDataArray);
      } catch (error) {
        console.error("Error fetching loginData:", error);
      }
    };
    fetchLoginData();
  }, []);

  return (
    <>
      <Top>
        {GrooveTop.map((item) => {
          const timestampSeconds = item.Timestamp.seconds;
          const date = new Date(timestampSeconds * 1000);
          const formattedTime = format(date, "yyyy-MM-dd HH:mm:ss");
          const userLoginData = loginData.find((loginItem) => loginItem.email === item.email);
          return (
            <StyledLink
              key={item.id}
              to={{
                pathname: `/detail/${item.id}`
              }}
              state={GrooveTop}
            >
              <ImgWrapBox>
                {item.imageUrl ? <img src={item.imageUrl} alt="업로드된 이미지" /> : <img src={defaultImage}></img>}
              </ImgWrapBox>
              <ContentWrapBox>
                <Title>{item.title}</Title>
                <Body>{item.body}</Body>
                <p>{formattedTime}</p>

                <UserLikeBox>
                  <p>
                    <i className="fa-solid fa-heart" /> {Object.keys(item.likes || {}).length}개
                  </p>
                </UserLikeBox>
                {/* nickname 값 렌더링 */}
                <p>{userLoginData ? userLoginData.nickname : "Unknown"}</p>
              </ContentWrapBox>
            </StyledLink>
          );
        })}
      </Top>
    </>
  );
};

export default GrooveFeed;
