import React from "react";
import { useSelector } from "react-redux";
import { SideBarItem } from "./SideBarItem.styles";
const SideBarItems = ({ Icon, title, to }) => {
  const { currentPage } = useSelector((state) => state.currentPage);
  const goTo = to !== "/" ? to : "dashboard";
  const active = currentPage === goTo;

  return (
    <SideBarItem to={to} active={active && "active"}>
      {Icon}
      <h3>{title}</h3>
    </SideBarItem>
  );
};

export default SideBarItems;
