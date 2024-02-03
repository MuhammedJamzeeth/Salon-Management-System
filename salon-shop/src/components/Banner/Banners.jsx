import React, { useRef } from "react";
import Slider from "react-slick";
import styled from "styled-components";

import Banner from "./Banner";

const Banners = ({ banners }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
  };

  const slideRef = useRef(null);

  return (
    <Slide>
      <Slider ref={slideRef} {...settings}>
        {banners.map((item) => (
          <Banner quote={item.quote} imageUrl={item.src} key={item.id} />
        ))}
      </Slider>
    </Slide>
  );
};

export default Banners;

const Slide = styled.div`
  width: 100%;

  .slick-dots li button:before {
    color: #fff;
  }

  .slick-dots li button:hover:before {
    color: #fff;
  }

  .slick-dots li.slick-active button:before {
    color: #fff;
  }
`;
