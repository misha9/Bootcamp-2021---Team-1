import React from "react";
import { Carousel } from "react-bootstrap";

function BootstrapSlider() {
  return (
    <div>
      <Carousel fade={true} controls={false}>
        <Carousel.Item interval={2000}>
          <img
            className='d-block w-100'
            style={{ height: "100vh" }}
            src='https://images.pexels.com/photos/1034662/pexels-photo-1034662.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
            alt='First slide'
          />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={2000}>
          <img
            className='d-block w-100'
            src='https://media.istockphoto.com/photos/watercolor-textured-background-picture-id887755698?k=20&m=887755698&s=612x612&w=0&h=UcvMcQg07D_WfBT88iOWWXMV5WMRXRM8nqJRXcySUNA='
            alt='Second slide'
            style={{ height: "100vh" }}
          />
          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={2000}>
          <img
            className='d-block w-100'
            src='https://cdn.pixabay.com/photo/2016/05/05/02/37/sunset-1373171__480.jpg'
            alt='Third slide'
            style={{ height: "100vh" }}
          />
          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default BootstrapSlider;
