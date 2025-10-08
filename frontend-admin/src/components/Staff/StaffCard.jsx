import React from "react";
import styled from "styled-components";

// import { Link } from "react-router-dom";
// import Slider from "react-slick";
// import circleloader from "../../assets/circle-loader.json";
import salon_avatar from "../../assets/staff.avif";
import { colors } from "../../styles/colors";

const StaffCard = ({ email, name, working_time, feature_images }) => {
  return (
    <StaffCardContainer>
      <StaffProfile>
        <ProfileBackground></ProfileBackground>
        <ProfileImage>
          <img
            src={
              feature_images.length > 0 ? feature_images[0]?.src : salon_avatar
            }
            alt={name}
          />
        </ProfileImage>
      </StaffProfile>
      <StaffTextName>{name}</StaffTextName>
      <StaffTextEmail>{email}</StaffTextEmail>
      <StaffTags>
        <StaffButton>{working_time}</StaffButton>
      </StaffTags>

      <StaffCardBottom></StaffCardBottom>
    </StaffCardContainer>
  );
};

export default StaffCard;

export const StaffCardContainer = styled.div`
  background: ${colors.colorWhite};
  max-height: 250px;
  min-height: 250px;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
`;
export const StaffProfile = styled.div`
  position: relative;
  height: 50%;
`;

export const ProfileImage = styled.div`
  position: absolute;
  left: 50%;
  right: 50%;
  top: 50%;
  bottom: 50%;
  transform: translate(-50%, -50%);
  width: 70px;
  height: 70px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
      rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
  }
`;

export const ProfileBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 62.5px;
  background: ${colors.colorBlack};
`;

export const StaffTypo = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  margin: 2px 0;
`;

export const StaffTextName = styled(StaffTypo)`
  font-size: 14px;
  color: ${colors.colorBlack};
`;

export const StaffTextEmail = styled(StaffTypo)`
  font-size: 12px;
  color: ${colors.colorGrayDark};
`;

export const StaffTags = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const StaffButton = styled(StaffTypo)`
  background: ${colors.colorBlack};
  color: ${colors.colorWhite};
  font-size: 12px;
  padding: 3px 6px;
  border-radius: 15px;
`;

export const StaffCardBottom = styled.div`
  background: ${colors.colorGrayDark};
`;
