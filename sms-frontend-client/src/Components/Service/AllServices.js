import React, { useState, useEffect } from 'react';
import './AllServices.css';

export default function AllServices() {
    const [services, setServices] = useState([]);
    const [showServices, setShowServices] = useState(false);

    useEffect(() => {
        if (showServices) {
            fetch('http://localhost:8080/getallservices')
                .then(response => response.json())
                .then(data => setServices(data))
                .catch(error => console.error('Error fetching services:', error));
        }
    }, [showServices]);

    return (
        <div className="all-services-container">
            <button 
                className="toggle-services-button" 
                onClick={() => setShowServices(prevShowServices => !prevShowServices)}
            >
                {showServices ? 'Hide all services' : 'Show all services'}
            </button>
            {showServices && (
                <div className="services-table-container">
                    <table className="services-table fade-in">
                        <thead>
                            <tr>
                                <th>Service Name</th>
                                <th>Description</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {services.map(service => (
                                <tr key={service.serviceId}>
                                    <td>{service.serviceName}</td>
                                    <td>{service.serviceDesc}</td>
                                    <td className="service-price">Rs. {service.servicePrice} </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}