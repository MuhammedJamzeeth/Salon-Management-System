import React from "react";
import { Container } from "../Header/Header.style";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import { green } from "@mui/material/colors";

const Header = ({total}) => {
  return (
    <Container>

      <div>
        {" "}
        <header>
          <p
            style={{
              paddingTop: 10,
            }}
          >
            Total Revenue
          </p>

          <ArrowCircleUpIcon
            style={{
              color: "green",
            }}
          ></ArrowCircleUpIcon>
        </header>
        <strong>Rs.{total}</strong>
      </div>
    </Container>
  );
};

export default Header;
