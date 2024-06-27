import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PersonDetails from '../Components/PersonDetails/PersonDetails';
import AppointmentList from '../Components/PersonDetails/AppointmentList';

const PersonPage = ({ match }) => {
  const [person, setPerson] = useState(null);
  const [appointments, setAppointments] = useState(null);

  useEffect(() => {
    const fetchPersonData = async () => {
      try {
        const personResponse = await axios.get(`/api/person/${match.params.id}`);
        setPerson(personResponse.data);
        
        const appointmentsResponse = await axios.get(`/api/person/${match.params.id}/appointments`);
        setAppointments(appointmentsResponse.data);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchPersonData();
  }, [match.params.id]);

  return (
    <div className="person-page">
      <div className="person-details-container">
        <PersonDetails person={person} />
      </div>
      <div className="appointments-container">
        <AppointmentList appointments={appointments} />
      </div>
    </div>
  );
};

export default PersonPage;
