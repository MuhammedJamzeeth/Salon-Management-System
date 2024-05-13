import React from 'react';
import './ServiceCard2.css';

const ServiceCard = ({ imageSrc, serviceName, description }) => {
    return (
        <div className="service-card">
            <div className="service-details">
                <h1>{serviceName}</h1>
                <p>{description}</p>
                <button>Book Now</button>
            </div>
            <div className="image-container">
                <img src={imageSrc} alt="Service" />
            </div>
        </div>
    );
};

export default ServiceCard;
