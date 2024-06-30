import { GithubAuthProvider, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import React, { useContext } from "react";
import { toast } from "react-toastify";
import { auth } from "../../../firebase";
import { GrooveContext } from "../../../shared/Context";

import { GoogleGitLogIn, PromptLogIn } from "../../../style/AuthStyle";

function GrooveSocialLogIn() {
  const { setIsUserLogIn, setSignUpModal, setNicknameModal } = useContext(GrooveContext);

  const handleGoogleSignUp = async () => {
    try {
      const provider = await new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      setIsUserLogIn(true);
      setSignUpModal(false);
      setNicknameModal(true);
    } catch (error) {
      toast.error("Error Notification!", { position: "top-left" });
      GoogleAuthProvider.credentialFromError(error);
      alert("오류가 발생했습니다.");
    }
  };

  const handleGitHubLogin = async () => {
    try {
      const provider = new GithubAuthProvider();
      const popUpforLogin = await signInWithPopup(auth, provider);
      GithubAuthProvider.credentialFromResult(popUpforLogin);

      setIsUserLogIn(true);
      setSignUpModal(false);
      setNicknameModal(true);
    } catch (error) {
      toast.error("Error Notification!", { position: "top-left" });
      GithubAuthProvider.credentialFromError(error);
      alert("오류가 발생했습니다.");
    }
  };

  return (
    <div>
      <div>or sign up with</div>
      <GoogleGitLogIn>
        <PromptLogIn type="button" onClick={handleGoogleSignUp}>
          <i className="fa-brands fa-google" /> Google
        </PromptLogIn>
        <PromptLogIn type="button" onClick={handleGitHubLogin}>
          <i className="fa-brands fa-github" /> Github
        </PromptLogIn>
      </GoogleGitLogIn>
    </div>
  );
}

export default GrooveSocialLogIn;
