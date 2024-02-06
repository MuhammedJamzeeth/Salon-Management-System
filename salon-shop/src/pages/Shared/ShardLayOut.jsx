import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Model from "../../components/ModelWindow/Model";
import NavBar from "../../components/Nav/NavBar";
import SideBar from "../../components/Sidebar/SideBar";
import { Body, Container } from "./Shared.styles";
const SharedLayOut = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSideBar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <Container>
      <SideBar isOpen={isOpen} toggleSideBar={toggleSideBar} />
      <Model isOpen={isOpen} toggleSideBar={toggleSideBar} />
      <Body>
        <NavBar isOpen={isOpen} toggleSideBar={toggleSideBar} />
        <Outlet />
      </Body>
    </Container>
  );
};

export default SharedLayOut;
