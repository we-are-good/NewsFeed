import React, { useEffect } from "react";
import { useState } from "react";
import {
  LogInForm,
  LogSigninButton,
  IDPWBox,
  LogInButtonsBox,
  LogInSmallButton,
  PromptLogIn,
  GoogleGitLogIn
} from "../../style/GrooveAuthStyle";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

function GrooveAuth() {
  const [logInModal, setLogInModal] = useState(false);
  const [activeName, setActiveName] = useState("Log in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");

  const onEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const onPasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const openModal = () => {
    setLogInModal(true);
  };

  const closeModal = () => {
    setLogInModal(false);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log("현재유저정보", user);
    });
  }, []);

  const signIn = async (event) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert("오류가 발생했습니다.");
    }
  };

  const signUp = async (event) => {
    event.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert("오류가 발생했습니다.");
    } finally {
      await setEmail("");
      setPassword("");
    }
  };

  const logOut = async (event) => {
    event.preventDefault();
    await signOut(auth);
  };

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "logInData"));
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
      });
    };
    fetchData();
  }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const q = query(collection(db, "logInData"));
  //     const querySnapshot = await getDocs(q);
  //     const initialTodos = [];
  //     querySnapshot.forEach((doc) => {
  //       const data = {
  //         id: doc.id,
  //         ...doc.data()
  //       };
  //       initialTodos.push(data);
  //     });
  //     setTodos(initialTodos);
  //   };
  //   fetchData();
  // }, []);

  return (
    <div>
      <button onClick={openModal}>Log in</button>
      <button onClick={logOut}>Log out</button>
      <div>
        {logInModal && (
          <div>
            <LogInForm>
              <div>
                <LogSigninButton name="activeName">Sign in</LogSigninButton>
                <LogSigninButton name="activeName" onClick={signUp}>
                  Sign up
                </LogSigninButton>
              </div>
              <IDPWBox>
                <input placeholder="ID" type="text" name="email" value={email} onChange={onEmailChange} />
              </IDPWBox>
              <IDPWBox>
                <input
                  placeholder="PASSWORD"
                  type="password"
                  name="password"
                  value={password}
                  onChange={onPasswordChange}
                />
              </IDPWBox>
              <LogInButtonsBox>
                <LogInSmallButton onClick={signIn}>Sign in</LogInSmallButton>
              </LogInButtonsBox>

              <div>or sign up with</div>

              <GoogleGitLogIn>
                <PromptLogIn>Google</PromptLogIn>
                <PromptLogIn>Git</PromptLogIn>
              </GoogleGitLogIn>
            </LogInForm>
          </div>
        )}
      </div>
    </div>
  );
}

export default GrooveAuth;
