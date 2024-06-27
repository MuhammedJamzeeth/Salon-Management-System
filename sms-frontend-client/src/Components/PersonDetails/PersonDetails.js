import React from 'react';

const PersonDetails = ({ person }) => {
  if (!person) return <div>Loading...</div>;

  return (
    <div className="person-details">
      <h2>{person.name}I am Fayas</h2>
      <p>Email: {person.email}</p>
      <p>Phone: {person.phone}</p>
    </div>
  );
};

export default PersonDetails;
