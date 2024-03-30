import React from "react";

import {
  Email,
  ProfileContainer,
  UserDetails,
  UserName,
} from "./Profile.styles";

import { Avatar } from "@mui/material";
import { useSelector } from "react-redux";

// import useLogOut from "../../hooks/user.logout";
import { currentUser } from "../../selectors/user.selector";
const Profile = () => {
  const user = useSelector(currentUser);
  // const { LogOut } = useLogOut();
  return (
    <ProfileContainer>
      <Avatar sx={{ width: 35, height: 35 }} src={user?.avatar} />

      <UserDetails>
        {user && <UserName>{user?.title}</UserName>}
        {user && <Email>{user.email}</Email>}
      </UserDetails>
    </ProfileContainer>
  );
};

export default Profile;
