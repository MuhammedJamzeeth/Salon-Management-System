import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton } from "@mui/material";
import React from "react";

import MenuIcon from "@mui/icons-material/Menu";
import Profile from "../Profile/Profile";
import {
  // Image,
  MenuWrapper,
  NavContainer,
  NavLeft,
  NavRight,
  ProfileWrapper,
  // Role,
  // UserDetails,
  // UserName,
} from "./NavBar.styles";
const NavBar = ({ toggleSideBar }) => {
  return (
    <NavContainer>
      <MenuWrapper onClick={toggleSideBar}>
        <IconButton>
          <MenuIcon sx={{ fontSize: 28 }} />
        </IconButton>
      </MenuWrapper>

      <NavLeft>
        <h1>Overview</h1>
      </NavLeft>
      <NavRight>
        <IconButton>
          <SearchIcon />
        </IconButton>
        <IconButton>
          <NotificationsNoneOutlinedIcon />
        </IconButton>
        <ProfileWrapper>
          <Profile />
        </ProfileWrapper>
      </NavRight>
    </NavContainer>
  );
};

export default NavBar;
