import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import { IconButton } from "@mui/material";
import React from "react";
import { colors } from "../../styles/colors";
import Card from "../Cards/card";

import {
  AppoinmentsCards,
  AppoinmentsContainer,
  AppoinmentsWrapper,
  ArrowDownWrapper,
} from "./Appoinment.styles";

const Appoinments = () => {
  return (
    <AppoinmentsWrapper>
      <AppoinmentsContainer>
        <h3>Upcomming Appoinments</h3>
        <AppoinmentsCards>
          <Card
            backGround={colors.colorGray}
            img={
              "https://images.unsplash.com/photo-1670272499188-79fe22656f64?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            }
          >
            <p style={{ fontSize: "12px", fontWeight: "700" }}>Alberto Raya</p>
            <span style={{ fontSize: "11px", fontWeight: "500" }}>
              Hair Styling
            </span>
            <span style={{ fontSize: "11px", fontWeight: "500" }}>
              10.30 - 11.00
            </span>
          </Card>
          <Card
            backGround={colors.colorGray}
            img={
              "https://images.unsplash.com/photo-1554151228-14d9def656e4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=386&q=80"
            }
          >
            <p style={{ fontSize: "12px", fontWeight: "600" }}>Ea Tipene</p>
            <span style={{ fontSize: "11px", fontWeight: "500" }}>
              Haircut and Spa
            </span>
            <span style={{ fontSize: "11px", fontWeight: "500" }}>
              10.30 - 11.00
            </span>
          </Card>
          <Card
            backGround={colors.colorGray}
            img={
              "https://images.unsplash.com/photo-1500048993953-d23a436266cf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80"
            }
          >
            <p style={{ fontSize: "12px", fontWeight: "600" }}>Kong Yijun</p>
            <span style={{ fontSize: "11px", fontWeight: "500" }}>Haircut</span>
            <span style={{ fontSize: "11px", fontWeight: "500" }}>
              10.30 - 11.00
            </span>
          </Card>
          <Card
            backGround={colors.colorGray}
            img={
              "https://images.unsplash.com/photo-1593104547489-5cfb3839a3b5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1153&q=80"
            }
          >
            <p style={{ fontSize: "12px", fontWeight: "600" }}>Praskovya</p>
            <span style={{ fontSize: "11px", fontWeight: "500" }}>Haircut</span>
            <span style={{ fontSize: "11px", fontWeight: "500" }}>
              11.00 - 12.00
            </span>
          </Card>
          <Card
            backGround={colors.colorGray}
            img={
              "https://images.unsplash.com/photo-1542206395-9feb3edaa68d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80"
            }
          >
            <p style={{ fontSize: "12px", fontWeight: "600" }}>Sammy Lawson</p>
            <span style={{ fontSize: "11px", fontWeight: "500" }}>
              Gina Haircut
            </span>
            <span style={{ fontSize: "11px", fontWeight: "500" }}>
              12.30 - 13.00
            </span>
          </Card>
          <Card
            backGround={colors.colorGray}
            img={
              "https://images.unsplash.com/photo-1670272499188-79fe22656f64?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            }
          >
            <p style={{ fontSize: "12px", fontWeight: "700" }}>Alberto Raya</p>
            <span style={{ fontSize: "11px", fontWeight: "500" }}>
              Hair Styling
            </span>
            <span style={{ fontSize: "11px", fontWeight: "500" }}>
              10.30 - 11.00
            </span>
          </Card>
          <Card
            backGround={colors.colorGray}
            img={
              "https://images.unsplash.com/photo-1554151228-14d9def656e4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=386&q=80"
            }
          >
            <p style={{ fontSize: "12px", fontWeight: "600" }}>Ea Tipene</p>
            <span style={{ fontSize: "11px", fontWeight: "500" }}>
              Haircut and Spa
            </span>
            <span style={{ fontSize: "11px", fontWeight: "500" }}>
              10.30 - 11.00
            </span>
          </Card>
          <Card
            backGround={colors.colorGray}
            img={
              "https://images.unsplash.com/photo-1500048993953-d23a436266cf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80"
            }
          >
            <p style={{ fontSize: "12px", fontWeight: "600" }}>Kong Yijun</p>
            <span style={{ fontSize: "11px", fontWeight: "500" }}>Haircut</span>
            <span style={{ fontSize: "11px", fontWeight: "500" }}>
              10.30 - 11.00
            </span>
          </Card>
          <Card
            backGround={colors.colorGray}
            img={
              "https://images.unsplash.com/photo-1593104547489-5cfb3839a3b5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1153&q=80"
            }
          >
            <p style={{ fontSize: "12px", fontWeight: "600" }}>Praskovya</p>
            <span style={{ fontSize: "11px", fontWeight: "500" }}>Haircut</span>
            <span style={{ fontSize: "11px", fontWeight: "500" }}>
              11.00 - 12.00
            </span>
          </Card>
          <Card
            backGround={colors.colorGray}
            img={
              "https://images.unsplash.com/photo-1542206395-9feb3edaa68d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80"
            }
          >
            <p style={{ fontSize: "12px", fontWeight: "600" }}>Sammy Lawson</p>
            <span style={{ fontSize: "11px", fontWeight: "500" }}>
              Gina Haircut
            </span>
            <span style={{ fontSize: "11px", fontWeight: "500" }}>
              12.30 - 13.00
            </span>
          </Card>
          <Card
            backGround={colors.colorGray}
            img={
              "https://images.unsplash.com/photo-1670272499188-79fe22656f64?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            }
          >
            <p style={{ fontSize: "12px", fontWeight: "700" }}>Alberto Raya</p>
            <span style={{ fontSize: "11px", fontWeight: "500" }}>
              Hair Styling
            </span>
            <span style={{ fontSize: "11px", fontWeight: "500" }}>
              10.30 - 11.00
            </span>
          </Card>
          <Card
            backGround={colors.colorGray}
            img={
              "https://images.unsplash.com/photo-1554151228-14d9def656e4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=386&q=80"
            }
          >
            <p style={{ fontSize: "12px", fontWeight: "600" }}>Ea Tipene</p>
            <span style={{ fontSize: "11px", fontWeight: "500" }}>
              Haircut and Spa
            </span>
            <span style={{ fontSize: "11px", fontWeight: "500" }}>
              10.30 - 11.00
            </span>
          </Card>
          <Card
            backGround={colors.colorGray}
            img={
              "https://images.unsplash.com/photo-1500048993953-d23a436266cf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80"
            }
          >
            <p style={{ fontSize: "12px", fontWeight: "600" }}>Kong Yijun</p>
            <span style={{ fontSize: "11px", fontWeight: "500" }}>Haircut</span>
            <span style={{ fontSize: "11px", fontWeight: "500" }}>
              10.30 - 11.00
            </span>
          </Card>
          <Card
            backGround={colors.colorGray}
            img={
              "https://images.unsplash.com/photo-1593104547489-5cfb3839a3b5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1153&q=80"
            }
          >
            <p style={{ fontSize: "12px", fontWeight: "600" }}>Praskovya</p>
            <span style={{ fontSize: "11px", fontWeight: "500" }}>Haircut</span>
            <span style={{ fontSize: "11px", fontWeight: "500" }}>
              11.00 - 12.00
            </span>
          </Card>
          <Card
            backGround={colors.colorGray}
            img={
              "https://images.unsplash.com/photo-1542206395-9feb3edaa68d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80"
            }
          >
            <p style={{ fontSize: "12px", fontWeight: "600" }}>Sammy Lawson</p>
            <span style={{ fontSize: "11px", fontWeight: "500" }}>
              Gina Haircut
            </span>
            <span style={{ fontSize: "11px", fontWeight: "500" }}>
              12.30 - 13.00
            </span>
          </Card>
        </AppoinmentsCards>
        <ArrowDownWrapper>
          <IconButton sx={{ padding: "6px" }}>
            <KeyboardDoubleArrowDownIcon
              sx={{ fontSize: 24, color: "#101727", padding: 0 }}
            />
          </IconButton>
        </ArrowDownWrapper>
      </AppoinmentsContainer>
    </AppoinmentsWrapper>
  );
};

export default Appoinments;
