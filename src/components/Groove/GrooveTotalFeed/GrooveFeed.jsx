import { useEffect, useState } from "react";
import { Top, StyledLink, ImgWrapBox, ContentWrapBox, Title, Body, UserLikeBox } from "../../../style/GrooveFeedStyle";
import { format } from "date-fns";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { app } from "../../../firebase";

const GrooveFeed = ({ GrooveTop, currentUser }) => {
  console.log(GrooveTop);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!currentUser); // currentUser가 있으면 true, 없으면 false로 설정
  }, [currentUser]);

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

        console.log("Fetched loginData:", loginDataArray);

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

          // userLoginData를 find로 찾음
          const userLoginData = loginData.find((loginItem) => loginItem.email === item.email);
          console.log("loginData", loginData);
          console.log("userLoginData", userLoginData);

          return (
            <StyledLink
              key={item.id}
              to={{
                pathname: `/detail/${item.id}`
              }}
              state={GrooveTop}
            >
              <ImgWrapBox>
                <img src={item.imageUrl} alt="업로드된 이미지" />
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
