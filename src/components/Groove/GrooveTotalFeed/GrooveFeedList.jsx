import React, { useEffect, useState } from "react";
import GrooveFeed from "./GrooveFeed";
import { addDoc, collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { auth, db } from "../../../firebase";

const GrooveFeedList = () => {
  const [GrooveTop, setGrooveTop] = useState([]);

  // useEffect 안에서 async/await를 만드려면 새로운 함수를 만들어야함
  useEffect(() => {
    const fetchData = async () => {
      // collection 이름이 todos인 collection의 모든 document를 가져옵니다.
      // const q = query(collection(db, "GrooveTop")) 아래코드가 정렬
      const q = query(collection(db, "GrooveTop"), orderBy("Timestamp", "desc"));
      const querySnapshot = await getDocs(q);
      const initialGrooveTop = [];
      // document의 id와 데이터를 initialGrooveTop 저장합니다.
      // doc.id의 경우 따로 지정하지 않는 한 자동으로 생성되는 id입니다.
      // doc.data()를 실행하면 해당 document의 데이터를 가져올 수 있습니다.
      querySnapshot.forEach((doc) => {
        const data = {
          id: doc.id, // 실제 firebase에서 "문서추가"부분
          ...doc.data()
        };
        // console.log("data", data);
        initialGrooveTop.push(data);
      });
      // firestore에서 가져온 데이터를 state에 전달
      setGrooveTop(initialGrooveTop);
    };
    fetchData();
  }, []);
  // const [currentUser, setCurrentUser] = useState(null);
  // const [userNickname, setUserNickname] = useState("");
  // const [userEmail, setUserEmail] = useState("");
  // const [userUid, setUserUid] = useState("");
  // const [userDocId, setUserDocId] = useState(""); // 사용자 문서의 ID 추가
  // const [userPosts, setUserPosts] = useState([]);
  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged(async (user) => {
  //     if (user) {
  //       setCurrentUser(user);
  //       setUserEmail(user.email);
  //       setUserUid(user.uid);
  //       fetchData(user.email);
  //     } else {
  //       setCurrentUser(null);
  //       setUserNickname("");
  //       setUserEmail("");
  //       setUserUid("");
  //       setUserDocId("");
  //     }
  //   });

  //   return () => {
  //     unsubscribe();
  //   };
  // }, []);
  // const fetchData = async (email) => {
  //   try {
  //     const q = query(collection(db, "logInData"), where("email", "==", email));
  //     const querySnapshot = await getDocs(q);
  //     querySnapshot.forEach((doc) => {
  //       const userData = doc.data();
  //       const nickname = userData.nickname;
  //       setUserNickname(nickname);
  //       setUserDocId(doc.id); // 사용자 문서의 ID 저장
  //       console.log(nickname);
  //     });
  //   } catch (error) {
  //     console.error("Error fetching user info:", error);
  //   }
  // };
  const [totalUsersInformation, setTotalUsersInformation] = useState([]);
  const [isUserLogIn, setIsUserLogIn] = useState(false);
  useEffect(() => {
    const fetchData = async (userEmail) => {
      const q = query(collection(db, "logInData"));
      const querySnapshot = await getDocs(q);

      const totalUsersInformation = await querySnapshot.docs.map((doc) => ({
        email: doc.data().email,
        nickname: doc.data().nickname
      }));
      setTotalUsersInformation(totalUsersInformation);
      console.log(totalUsersInformation);
      const nowLogIn = await totalUsersInformation.find((information) => information.email === userEmail);
      if (!nowLogIn) {
        return;
      }
      const nowLogInNickname = nowLogIn.nickname;
      if (!totalUsersInformation) return;
    };
    fetchData();
  }, []);

  return (
    <>
      <GrooveFeed GrooveTop={GrooveTop} totalUsersInformation={totalUsersInformation} />
    </>
  );
};

export default GrooveFeedList;
