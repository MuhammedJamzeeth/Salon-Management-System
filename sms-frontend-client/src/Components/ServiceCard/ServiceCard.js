import React from 'react';
import './ServiceCard.css';

const ServiceCard = ({ imageSrc, serviceName, description }) => {
    return (
        <div className="service-card">
        <div className="image-container">
            <img src={imageSrc} alt="Service" />
        </div>
        <div className="service-details">
            <h1>{serviceName}</h1>
            <p>{description}</p>
            <button>Book Now</button>
        </div>
        </div>
    );
};

export default ServiceCard;
