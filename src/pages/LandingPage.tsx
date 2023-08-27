import React from "react";
import SampleMapImage1 from "../assets/images/Sample1.webp"; // Import your sample images
import SampleMapImage2 from "../assets/images/Sample2.webp"; // Import your sample images
import SampleMapImage3 from "../assets/images/Sample3.png"; // Import your sample images

const LandingPage: React.FC = () => {
  return (
    <div className="landing-page">
      <h1>Welcome to Map Editor</h1>
      <p> Create and edit Choropleth maps with ease using our Map Editor!</p>
      <div className="map-images">
        <img src={SampleMapImage1} alt="Sample Map 1" />
        <img src={SampleMapImage2} alt="Sample Map 2" />
        <img src={SampleMapImage3} alt="Sample Map 3" />
        {/* Add more images here */}
      </div>
      <a href="/select" className="simple-button">
        Get Started
      </a>
    </div>
  );
};

export default LandingPage;
