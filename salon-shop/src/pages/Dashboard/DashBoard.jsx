import React from "react";

import Appoinments from "../../components/Appoinments/Appoinments";

import Statistics from "../../components/Statistics/Statistics";
import { DashBoardContainer } from "../Dashboard/DashBoard.styles";

const DashBoard = () => {
  return (
    <DashBoardContainer>
      <Statistics />
      <Appoinments />
    </DashBoardContainer>
  );
};

export default DashBoard;
