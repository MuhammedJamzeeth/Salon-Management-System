import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DeleteIcon from '../../assets/icon-delete.png'
import EditIcon from '../../assets/edit-icon.png'
import './ServiceList.css';

function ServiceList() {
    const [services, setServices] = useState([]);

    useEffect(() => {
        async function fetchServices() {
            try {
                const response = await axios.get('http://localhost:8080/services/allservices');
                setServices(response.data);
            } catch (error) {
                console.error('Error fetching services:', error);
            }
        }

        fetchServices();
    }, []);

    return (
        <div className='services-list'>
            {services.map(service => (
                <div className='service-list-style'> <br/>
                    <p>{service.serviceName}</p>
                    <p>Rs.{service.servicePrice}.00</p>
                    <h5>{service.serviceState}</h5> 
                    <button type='submit' className="editButton" > 
                    {/* onClick={() => setFormDetails(service)}  */}
                    <img src={EditIcon} className="editIcon" alt="Edit" style={{ marginRight: '5px' }} /> Edit </button>
                    <button type='submit' className="deleteButton" >
                    {/* onClick={() => deleteService(service.serviceId)} */}
                    <img src={DeleteIcon} className="deleteIcon" alt="Delete" style={{ marginRight: '5px' }} /> Delete</button>
                </div>
            ))}
        </div>
    );
}

export default ServiceList;
