import React from "react";
import Carousel from "react-bootstrap/Carousel";
import Slide1 from "./img/slide1.webp";
import Slide2 from "./img/slide2.webp";
import Slide3 from "./img/slide3.webp";


import "./MyCarousal.css";
const MyCarousal = () => {
  return (
    <div>
      <Carousel controls={false} indicators interval={2000} pause={false}>
        <Carousel.Item>
          <img
            className="d-block w-100 custom-img"
            src={Slide1}
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 custom-img"
            src={Slide2}
            alt="Third slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 custom-img"
            src={Slide3}
            alt="Third slide"
          />
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default MyCarousal;
