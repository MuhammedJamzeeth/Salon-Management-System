import React, { useState } from 'react';
import './FloatingButton.css';
import { AiOutlineComment } from 'react-icons/ai'; 
import Reviews from './Reviews';

const FloatingButton = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleReviewComponent = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="floating-button-container">
            <button className="floating-button" onClick={toggleReviewComponent}>
                <AiOutlineComment /> 
            </button>
            {isOpen && <Reviews onClose={() => setIsOpen(false)} />}
        </div>
    );
};

export default FloatingButton;
