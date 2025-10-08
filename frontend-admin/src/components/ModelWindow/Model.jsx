import React from "react";

import { ModelWrapper } from "./model.styles";

const Model = ({ isOpen, toggleSideBar }) => {
  return <ModelWrapper isOpen={isOpen} onClick={toggleSideBar} />;
};

export default Model;
