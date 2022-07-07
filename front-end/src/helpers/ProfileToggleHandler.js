// toggler allows to show an option by adding a "-show" to the end of a class or hiding by adding "-hide" at the end of a class

const toggler = (
  condition,
  setToggleGallery,
  setToggleImageEdit,
  setToggleUpdateInfo
) => {
  if (condition === "update") {
    function toggle() {
      setToggleUpdateInfo("-show");
      setToggleImageEdit("-hide");
      setToggleGallery("-hide");
    }
    toggle();
  }
  if (condition === "imageEdit") {
    function toggleImageEditHandler(e) {
      setToggleImageEdit("-show");
      setToggleUpdateInfo("-hide");

      setToggleGallery("-hide");
    }
    toggleImageEditHandler();
  }
  if (condition === "gallery") {
    function toggleGalleryHandler() {
      setToggleGallery("-show");
      setToggleImageEdit("-hide");
      setToggleUpdateInfo("-hide");
    }
    toggleGalleryHandler();
  }
};
export default { toggler };
