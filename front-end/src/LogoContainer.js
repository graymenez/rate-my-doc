import React from "react";
import img from "../src/images/924edeef395d45c783f88b906cb70bb7.ico";
import physiciansImage from "../src/images/5a3a78ee51b5e3.83672892151378148633477904.png";
import leafImage from "../src/images/kisspng-whole-health-a-holistic-approach-to-healing-for-t-ecology-5acda5ee9f9435.3593313915234267986537.png";
import "./styles/LogoContainer.css";
const LogoContainer = ({
  images = { img: img, physiciansImage: physiciansImage, leafImage: leafImage },
}) => {
  // Renders the container for header logos on different Routes
  return (
    <>
      <div id="logoContainer" className="logoContainer">
        <img
          id="physicianPhoto"
          className="physicianPhoto"
          src={images.physiciansImage}
        />

        <section id="leafSection" className="leafSection">
          <img id="leafPhoto" className="leafPhoto" src={images.leafImage} />
        </section>
      </div>
      <div id="breakPointUnderLogo"></div>
    </>
  );
};
export default LogoContainer;
