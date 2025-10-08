import React from 'react';

const AppointmentList = ({ appointments }) => {
  if (!appointments) return <div>Loading...</div>;

  return (
    <div className="appointment-list">
      <h2>Appointments</h2>
      <ul>
        {appointments.map((appointment) => (
          <li key={appointment.id}>
            {appointment.date} - {appointment.time} - {appointment.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AppointmentList;
