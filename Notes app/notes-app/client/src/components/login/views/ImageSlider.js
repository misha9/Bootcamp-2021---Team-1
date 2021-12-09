import React from "react";

import SimpleImageSlider from "react-simple-image-slider";

const images = [
  {
    url: "https://images.pexels.com/photos/1034662/pexels-photo-1034662.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  },
  {
    url: "https://media.istockphoto.com/photos/watercolor-textured-background-picture-id887755698?k=20&m=887755698&s=612x612&w=0&h=UcvMcQg07D_WfBT88iOWWXMV5WMRXRM8nqJRXcySUNA=",
  },
  {
    url: "https://cdn.pixabay.com/photo/2016/05/05/02/37/sunset-1373171__480.jpg",
  },
  //   { url: "images/4.jpg" },
  //   { url: "images/5.jpg" },
  //   { url: "images/6.jpg" },
  //   { url: "images/7.jpg" },
];

function ImageSlider() {
  return (
    <div>
      <SimpleImageSlider
        width={"59%"}
        height={"100vh"}
        images={images}
        showBullets={true}
        showNavs={true}
        autoPlay={true}
      />
    </div>
  );
}

export default ImageSlider;
