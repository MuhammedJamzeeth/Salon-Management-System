import React from 'react';
import './Testimonial.css';
import profileImage from './profile.jpg'; 

const Profile = ({ name, date, imageUrl }) => {
  return (
    <div className="profile">
      <div className="profile-img">
        <img src={imageUrl || profileImage} alt="Profile" />
      </div>
      <div className="name-user">
        <strong>{name} </strong>
        <span>{date} </span>
      </div>
    </div>
  );
};

export default Profile;
