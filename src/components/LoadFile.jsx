import React, { useState } from "react";
import { auth, storage } from "../firebase";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

// function LoadFile() {
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [imageUrl, setImageUrl] = useState();
//   const handleFileSelect = (event) => {
//     setSelectedFile(event.target.files[0]);
//   };

//   const imageRef = ref(storage, `${auth.currentUser.uid}/${selectedFile.name}`);
//   uploadBytes(imageRef, selectedFile);

//   // 파일 URL 가져오기
//   const downloadURL = getDownloadURL(imageRef);
//   console.log("downloadURL", downloadURL);
//   setImageUrl(downloadURL);

//   return (
//     <>
//       <div>LoadFile Prac</div>
//       {/* <input type="file" onChange={handleFileSelect} />
//       <button onClick={handleUpload}>Upload</button> */}

//       <img src={imageUrl} alt="기본이미지" style={{ width: "200px", height: "200px" }}></img>
//     </>
//   );
// }

// const LoadFile = async (img) => {
//   const storage = getStorage();
//   try {
//     const newURL = "todos/" + `${img}`;
//     const url = await getDownloadURL(ref(storage, newURL));

//     const response = await fetch(url);
//     const blob = await response.blob();
//     const imageURL = URL.createObjectURL(blob);
//     return imageURL;
//   } catch (error) {
//     console.error("Error loading image:", error);
//   }
// };
const LoadFile = () => {
  const storage = getStorage();
  getDownloadURL(ref(storage, "2cKLEQKrHrV3y2yHOf5EInGMspM2/다운로드 (1).jfif"))
    .then((url) => {
      // `url` is the download URL for 'images/stars.jpg'
      // This can be downloaded directly:
      const xhr = new XMLHttpRequest();
      xhr.responseType = "blob";
      xhr.onload = (event) => {
        const blob = xhr.response;
      };
      xhr.open("GET", url);
      xhr.send();

      // Or inserted into an <img> element
      const img = document.getElementById("myimg");
      img.setAttribute("src", url);
    })
    .catch((error) => {
      // Handle any errors
    });
};
export default LoadFile;
