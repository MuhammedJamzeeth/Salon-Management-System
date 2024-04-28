import React from "react";
import { Container } from "../Header/Header.style";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import { green } from "@mui/material/colors";

const Header = () => {
  return (
    <Container>
      <div>
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
        <strong>RS. 1000.00</strong>
      </div>
      <div>
        {" "}
        <header>
          <p
            style={{
              paddingTop: 10,
            }}
          >
            Monthly Revenue
          </p>

          <ArrowCircleUpIcon
            style={{
              color: "green",
            }}
          ></ArrowCircleUpIcon>
        </header>
        <strong>RS. 1000.00</strong>
      </div>
      <div>
        {" "}
        <header>
          <p
            style={{
              paddingTop: 10,
            }}
          >
            Today: Revenue
          </p>

          <ArrowCircleUpIcon
            style={{
              color: "green",
            }}
          ></ArrowCircleUpIcon>
        </header>
        <strong>RS. 1000.00</strong>
      </div>
    </Container>
  );
};

export default Header;
