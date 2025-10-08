import React from 'react';
import './ServiceCard2.css';
import { useNavigate } from 'react-router-dom';

const ServiceCard2 = ({ imageSrc }) => {
    const navigate = useNavigate();
    return (
        <div className="container">
            <div className="service-details">
                <div className="service-section">
                    <h1>Hair Related Services</h1>
                    <button onClick={() => navigate("/service")}>Book Now</button>
                </div>
                <div className="service-section">
                    
                </div>
                <div className="service-card">
                    <img src={imageSrc} alt="Service" />
                </div>
            </div>
        </div>
    );
};

export default ServiceCard2;

