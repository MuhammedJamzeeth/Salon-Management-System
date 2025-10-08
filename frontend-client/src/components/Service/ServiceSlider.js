import React, { useState, useEffect } from 'react';
import './ServiceSlider.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

export default function ServiceSlider() {
    const [services, setServices] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        fetch('http://localhost:8080/getallservices')
            .then(response => response.json())
            .then(data => setServices(data))
            .catch(error => console.error('Error fetching services:', error));
    }, []);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 3) % activeServices.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 3 + activeServices.length) % activeServices.length);
    };

    const activeServices = services.filter(service => service.serviceState === 'Active');

    return (
        <>
            <div className="all-services-container">
                <div className="slider">
                    <FontAwesomeIcon icon={faChevronLeft} size="2x" className="slider-icon left" onClick={prevSlide} />
                    <div className="slider-content">
                        {activeServices.slice(currentIndex, currentIndex + 3).map((service) => (
                            <div key={service.serviceId} className="service-item">
                                <h3 className='h3-sname'>{service.serviceName}</h3>
                                <p className='p-sdesc'>{service.serviceDesc}</p>
                                <p className="service-price">Rs. {service.servicePrice}</p>
                            </div>
                        ))}
                    </div>
                    <FontAwesomeIcon icon={faChevronRight} size="2x" className="slider-icon right" onClick={nextSlide} />
                </div>
            </div>
        </>
    );
}
