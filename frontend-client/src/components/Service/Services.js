import React, { useState, useEffect } from 'react';
import './services.css'; // Import CSS file for styling

function Services() {
    const [services, setServices] = useState([]);
    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(() => {
        // Fetch services from backend
        fetchServices();
    }, []);

    const fetchServices = () => {
        // Fetch services from backend API
        fetch('http://localhost:8080/getallservices')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch services');
                }
                return response.json();
            })
            .then(data => {
                if (data.length > 0) {

                    setServices(data);
                    console.log('Services fetched:', data);
                } else {
                    console.log('No services found');
                }
            })
            .catch(error => console.error('Error fetching services:', error));
    };

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <>
            <div className="services-container">
                <h2>Our Services</h2>
                <div className={`service-list ${isExpanded ? 'expanded' : ''}`}>
                    {services.slice(0, isExpanded ? services.length : 10).map((service) => (
                        <div key={service.serviceId} className="service-item">
                            <div className="service-icon">
                                {service.serviceName.toUpperCase()}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="toggle-button" onClick={toggleExpand}>
                    {isExpanded ? 'Minimize' : 'Maximize'}
                </div>
            </div>
        </>
    );
}

export default Services;
