import { useContext, useState } from "react";
import { EditProfileImage, EditProfileImageChange } from "../../../style/MypageStyle";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../../../firebase";
import { doc, updateDoc } from "firebase/firestore";
import { GrooveContext } from "../../../shared/Context";
import { toast } from "react-toastify";

function AvatarChange({ userDocId, setProfileImageUrl }) {
  const { currentUser } = useContext(GrooveContext);
  const [editingProfileImageModal, setEditingProfileImageModal] = useState(false);
  const [avatarFile, setAvatarFile] = useState(null);

  const storageRef = ref(storage, "avatars");

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    setAvatarFile(file);
  };

  const updateProfileImage = async (url) => {
    try {
      const userDocRef = doc(db, "logInData", userDocId);
      await updateDoc(userDocRef, {
        profileImage: url
      });
      setProfileImageUrl(url);
    } catch (error) {
      toast.error("프로필 이미지가 수정되지 않았습니다.", { position: "top-left" });
    }
  };

  const confirmProfileImageChange = async () => {
    if (avatarFile) {
      const storageRefChild = ref(storageRef, `${currentUser.uid}_${avatarFile.name}`);
      try {
        await uploadBytes(storageRefChild, avatarFile);
        const url = await getDownloadURL(storageRefChild);
        await updateProfileImage(url);
        setEditingProfileImageModal(false);
      } catch (error) {
        toast.error("프로필 이미지가 수정되지 않았습니다.", { position: "top-left" });
      }
    }
  };

  const cancelProfileImageChange = () => {
    setEditingProfileImageModal(false);
  };

  return (
    <>
      <EditProfileImage>
        <button onClick={() => setEditingProfileImageModal((prev) => !prev)}>프로필 이미지 수정</button>
      </EditProfileImage>
      {editingProfileImageModal && (
        <EditProfileImageChange>
          <input type="file" accept="image/*" onChange={(e) => handleAvatarChange} />
          <button onClick={confirmProfileImageChange}>확인</button>
          <button onClick={cancelProfileImageChange}>취소</button>
        </EditProfileImageChange>
      )}
    </>
  );
}

export default AvatarChange;
