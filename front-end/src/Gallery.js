import React, { useEffect, useState } from "react";
import RmdApi from "./api";
import "./styles/ProfileGallery.css";
const Gallery = ({ show }) => {
  const [photos, setPhotos] = useState({});
  const [photosLoaded, setPhotosLoaded] = useState(false);
  useEffect(() => {
    // Gets photos by the current users id and sets all photos to state

    const getAllPhotos = async () => {
      let results = await RmdApi.getGallery(localStorage.getItem("lU-id"));
      setPhotos(results);
      setPhotosLoaded(true);
    };
    getAllPhotos();
  }, []);

  // Updates profile picture by clicking on the image
  const updateProflePicture = async (e) => {
    await RmdApi.updateProfilePicture(
      localStorage.getItem("lU-id"),
      e.target.src
    );
    window.location.reload(false);
  };
  console.log(photos);

  // Maps throw the array of photos in photos state and renders them on page
  return (
    <div className={`ProfileGallery${show}`}>
      <h1 className="ProfileGalleryHeader">Gallery</h1>
      <small className="ProfileGallerySmall">Choose a photo</small>
      {photosLoaded
        ? photos.map((photo) => (
            <a href="#">
              <img
                onClick={updateProflePicture}
                className="GalleryPhotos"
                src={photo.image_url}
              />
            </a>
          ))
        : null}
    </div>
  );
};
export default Gallery;
