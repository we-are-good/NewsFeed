import { useEffect, useState } from "react";
import { Top, StyledLink, ImgWrapBox, ContentWrapBox, Title, Body, UserLikeBox } from "../../../style/GrooveFeedStyle";
import { format } from "date-fns";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { app } from "../../../firebase";

// const GrooveFeed = ({ GrooveTop, totalUsersInformation }) => {
//   console.log(GrooveTop);
//   console.log("totalUsersInformation", totalUsersInformation);

//   const [loginData, setLoginData] = useState([]);
//   console.log("loginData", loginData);
//   useEffect(() => {
//     const fetchLoginData = async () => {
//       try {
//         const db = getFirestore(app);
//         const loginDataCollection = collection(db, "logInData");
//         const snapshot = await getDocs(loginDataCollection);
//         const loginDataArray = [];
//         snapshot.forEach((doc) => {
//           const data = doc.data();
//           loginDataArray.push({
//             id: doc.id,
//             nickname: data.nickname

//           });
//         });

//         setLoginData(loginDataArray);
//       } catch (error) {
//         console.error("Error fetching loginData:", error);
//       }
//     };

//     fetchLoginData();
//   }, []);

//   return (
//     <>
//       <Top>
//         {GrooveTop.map((item) => {
//           const timestampSeconds = item.Timestamp.seconds;
//           const date = new Date(timestampSeconds * 1000); // 초를 밀리초로 변환
//           const formattedTime = format(date, "yyyy-MM-dd HH:mm:ss"); // 시분초로 포맷팅
//           // loginData에서 현재 item의 id와 일치하는 데이터 찾기
//           const userLoginData = loginData.find((loginItem) => loginItem.id === item.userId);

//           return (
//             // 여기서 item은 Firestore Database의 문서!
//             // <StyledLink to={`/detail/${item.id}`} key={item.id}>
//             <StyledLink
//               key={item.id}
//               to={{
//                 pathname: `/detail/${item.id}`
//               }}
//               state={GrooveTop}
//             >
//               {/* <div key={item.id} onClick={navigate(`/detail/${item.id}`)}> */}
//               <ImgWrapBox>
//                 <img src={item.imageUrl} alt="업로드된 이미지"></img>
//               </ImgWrapBox>
//               <ContentWrapBox>
//                 <Title>{item.title}</Title>
//                 <Body>{item.body}</Body>

//                 <p>{formattedTime}</p>

//                 {/* 좋아요 버튼 및 갯수 렌더링 */}
//                 <UserLikeBox>
//                   <p>
//                     <i className="fa-solid fa-heart" /> {item.likes ? Object.keys(item.likes).length : 0}개
//                   </p>
//                 </UserLikeBox>
//                 {/* nickname 값 렌더링 */}
//                 <p>{userLoginData ? userLoginData.nickname : "Unknown"}</p>
//               </ContentWrapBox>
//               {/* </div> */}
//             </StyledLink>
//           );
//         })}
//       </Top>
//     </>
//   );
// };

// export default GrooveFeed;
const GrooveFeed = ({ GrooveTop, totalUsersInformation, currentUser }) => {
  console.log(GrooveTop);
  console.log("totalUsersInformation", totalUsersInformation);
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

          // userLoginData를 find로 찾도록 수정
          const userLoginData = loginData.find((loginItem) => loginItem.id === (currentUser?.uid || ""));
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
