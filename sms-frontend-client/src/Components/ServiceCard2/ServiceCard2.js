import React from 'react';
import './ServiceCard2.css';

const ServiceCard2 = ({ imageSrc, serviceName, description }) => {
    return (
        <div className="container">
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
                <div className="service-card">
                    <img src={imageSrc} alt="Service" />
                </div>
            </div>
        </div>
    );
};

export default ServiceCard2;

