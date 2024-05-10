import React from 'react';
import './Testimonial.css';

const Profile = ({ name, username, imageUrl }) => {
  return (
    <div className="profile">
      <div className="profile-img">
        <img src={imageUrl} alt="Profile" />
      </div>
      <div className="name-user">
        <strong>{name}</strong>
        <span>@{username}</span>
      </div>
    </div>
  );
};

export default Profile;
