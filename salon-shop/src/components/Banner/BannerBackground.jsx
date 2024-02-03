import React from "react";
import styled from "styled-components";

const BannerBackground = ({ Background, children }) => {
  return <BannerWrapper src={Background}>{children}</BannerWrapper>;
};

export default BannerBackground;

export const BannerWrapper = styled.div`
  background-image: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0) 10%,
      #101727 100%
    ),
    url(${({ src }) => src});
  width: 100%;
  height: 200px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  position: relative;
`;
