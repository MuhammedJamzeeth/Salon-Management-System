import React from 'react';
import './ServiceCard.css';

const ServiceCard = ({ imageSrc, serviceName, description }) => {
    return (
        <div className="container">
            <div className="service-card">
                <img src={imageSrc} alt="Service" />
            </div>
            <div className="service-details">
                <div className="service-section">
                    <h1>{serviceName}</h1>
                    <p>{description}</p>
                    <button>Book Now</button>
                </div>
                <div className="service-section">
                    <h1>{serviceName}</h1>
                    <p>{description}</p>
                    <button>Book Now</button>
                </div>
                <div className="service-section">
                    <h1>{serviceName}</h1>
                    <p>{description}</p>
                    <button>Book Now</button>
                </div>
            </div>
        </div>
    );
};

export default ServiceCard;

