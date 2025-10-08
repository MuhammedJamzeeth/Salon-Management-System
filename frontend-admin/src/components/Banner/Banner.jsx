import React from "react";
import styled from "styled-components";
import { colors } from "../../styles/colors";

const Banner = ({ imageUrl, quote }) => {
  return (
    <BannerContainer>
      <Image src={imageUrl} />
      {/*<h1>{quote}</h1>*/}
    </BannerContainer>
  );
};

export default Banner;
const BannerContainer = styled.div`
  h1 {
    font-size: 25px;
    font-weight: 500;
    padding: 10px;
    color: ${colors.colorWhite};
    text-align: center;
  }
`;
const Image = styled.div`
  width: 100%;
  height: 450px;

  border-radius: 10px;
  background-position: center; /* Center the image */
  background-repeat: no-repeat; /* Do not repeat the image */
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0) 20%,
      rgba(0, 0, 0, 1) 100%
    ),
    url(${({ src }) => src});
`;
