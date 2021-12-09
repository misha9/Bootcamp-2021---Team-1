import React from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

// const style = {
//   textAlign: "center",
//   background: "teal",
//   padding: "200px 0",
//   fontSize: "30px",
// };

function ImageSlide() {
  const slideImages = [
    {
      url: "https://images.pexels.com/photos/1034662/pexels-photo-1034662.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      caption: "Slide 1",
    },
    {
      url: "https://media.istockphoto.com/photos/watercolor-textured-background-picture-id887755698?k=20&m=887755698&s=612x612&w=0&h=UcvMcQg07D_WfBT88iOWWXMV5WMRXRM8nqJRXcySUNA=",
      caption: "Slide 2",
    },
    {
      url: "https://cdn.pixabay.com/photo/2016/05/05/02/37/sunset-1373171__480.jpg",
      caption: "Slide 3",
    },
  ];

  return (
    <div className='slide-container'>
      <Slide>
        {slideImages.map((slideImage, index) => (
          <div className='each-slide' key={index}>
            <div
              style={{
                backgroundImage: `url(${slideImage.url})`,
              }}
            >
              <span>{slideImage.caption}</span>
            </div>
          </div>
        ))}
      </Slide>
    </div>
  );
}

export default ImageSlide;
