import React, { useEffect, useState } from "react";
import RmdApi from "./api";

// Gets image input from file input uses FileReader to readAsDataUrl then sends data to cloudinary then I get the url from backend then save it to users table

const ProfileImage = () => {
  const [previewSource, setPreviewSource] = useState("");
  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    previewFile(file);
  };
  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };
  const handleSubmitFile = (e) => {
    e.preventDefault();
    if (!previewSource) return;
    uploadImage(localStorage.getItem("lU-id"), previewSource);
  };
  const uploadImage = async (id, base64EncodedImage) => {
    try {
      await RmdApi.uploadPhoto(id, base64EncodedImage);
      window.location.reload(false);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className={`ProfileImageContainer`}>
      <h3 className="image-form-title">Update or add profile picture</h3>
      <form className="image-form" onSubmit={handleSubmitFile}>
        <p className="click-instruction">Click</p>
        <ion-icon
          class="click-instruction-arrow"
          name="caret-down-outline"
        ></ion-icon>
        <label htmlFor="image" className="image-upload-btn">
          <ion-icon name="image-outline"></ion-icon>
        </label>
        <input
          id="image"
          type="file"
          name="image"
          onChange={handleFileInputChange}
          className="image-form-input"
        />
        <button className="image-btn" type="submit">
          Submit
        </button>
      </form>
      {previewSource ? (
        <img className="preview-image" src={previewSource} />
      ) : (
        <div className="preview-no-image">
          <p>No preview image available</p>
          <p>
            <ion-icon name="bug-outline"></ion-icon>
          </p>
        </div>
      )}
    </div>
  );
};
export default ProfileImage;
