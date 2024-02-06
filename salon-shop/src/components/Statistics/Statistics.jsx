import React, { useEffect } from "react";
import Appointment from "../../assets/appointments.png";
import Client from "../../assets/customer-service.png";
import Service from "../../assets/service.png";
import { colors } from "../../styles/colors";
import Card from "../Cards/card";
import Financial from "../Financial/Financial";

import { useSelector } from "react-redux";
import useService from "../../hooks/service/useServices";
import Graph from "../GraphStatistics/Graph";
import Stylists from "../Staff/StaffDashboard";
import { NumericalStatistics, StatisticsContainer } from "./Statistics.styles";
const Statistics = () => {
  const { getAllServices } = useService();
  useEffect(() => {
    getAllServices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const services = useSelector((state) => state.services.current_services);
  return (
    <StatisticsContainer>
      <NumericalStatistics>
        <Card backGround={colors.colorWhite} img={Client}>
          <span style={{ fontSize: "14px", fontWeight: "600" }}>Clinets</span>
          <span style={{ fontSize: "12px", fontWeight: "500" }}>1000</span>
        </Card>
        <Card backGround={colors.colorWhite} img={Appointment}>
          <span style={{ fontSize: "14px", fontWeight: "600" }}>
            Appoinments
          </span>
          <span style={{ fontSize: "12px", fontWeight: "500" }}>900</span>
        </Card>
        <Card backGround={colors.colorWhite} img={Service}>
          <span style={{ fontSize: "14px", fontWeight: "600" }}>Services</span>
          <span style={{ fontSize: "12px", fontWeight: "500" }}>
            {services.length}
          </span>
        </Card>
      </NumericalStatistics>
      {/* <Graph /> */}
      <Stylists />
      {/* <Financial /> */}
    </StatisticsContainer>
  );
};

export default Statistics;
