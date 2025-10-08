import StarIcon from "@mui/icons-material/Star";
import { Chip, Typography } from "@mui/material";
import { styled as MUIstyled } from "@mui/system";
import React from "react";
import styled from "styled-components";
import backgroundImage from "../../assets/MostPopular.jpg";
import { colors } from "../../styles/colors";
export const CustomChip = MUIstyled(Chip)({
    backgroundColor: colors.colorBlack, // Set your custom background color
    color: "white", // Set your custom text color
    fontWeight: 600,
    fontSize: 10,

    cursor: "default",
    "&:hover": {
        backgroundColor: "#ff7f27", // Set hover background color
    },
});

const Popular = () => {
    return (
        <PopularContainer
            style={{
                backgroundImage: `url(${backgroundImage})`,
            }}
        >
            <CustomChip
                label="Most Popular"
                style={{ position: "absolute", top: "10px", left: "10px" }}
            />
            <PopularCard>
                <Reviews>
                    {[...Array(5)].map((item) => (
                        <StarIcon fontSize="10" style={{ color: colors.colorOrange }} />
                    ))}
                </Reviews>
                <Typography
                    style={{
                        fontSize: "14px",
                        color: colors.colorBlack,
                        marginBottom: "10px",
                        fontWeight: 700,
                    }}
                >
                    Mohamed Safras
                </Typography>
                <Typography
                    style={{
                        fontSize: "10px",
                        color: colors.colorGrayDark,
                    }}
                >
                    Most Popular style in 2023
                </Typography>
            </PopularCard>
        </PopularContainer>
    );
};

export default Popular;

export const PopularContainer = styled.div`
  flex: 0.25;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 100%;
  height: 100%;
  position: relative;
  border-radius: 15px;

  /* padding: 0 10px;/ */
`;

export const PopularCard = styled.div`
  position: absolute;
  left: 50%;
  right: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  bottom: 5%;
  transform: translate(-50%, 0%);
  padding: 10px;
  background: ${colors.colorWhite};
  width: calc(100% - 20px);
  border-radius: 15px;
  /* height: 150px; */
`;

export const Reviews = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;
