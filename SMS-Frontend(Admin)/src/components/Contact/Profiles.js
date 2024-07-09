import React from 'react'

const Profiles = (id, name, email, imageUrl,phone_number , message, date ) => {
    return (
        <div className="profile">
          <div className="profile-img">
            <img src={imageUrl || profileImage} alt="Profile" />
          </div>
          <div className="name-user">
            <strong>{name} </strong>
            <span>{email} </span>
          </div>
        </div>
      );
    };
export default Profiles