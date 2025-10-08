import React, { useState, useEffect } from 'react';
import './ImageSlider.css';
import image1 from '../../Resources/image1.jpg';
import image2 from '../../Resources/image2.jpg';
import image3 from '../../Resources/image3.png';

function ImageSlider() {
    const [activeIndex, setActiveIndex] = useState(0);
    const images = [image1, image2, image3]; // Use your images array here

    useEffect(() => {
        const intervalId = setInterval(() => {
            setActiveIndex(prevIndex => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
        }, 3000); // Run effect only once when component mounts
        return () => clearInterval(intervalId);
    }, [images.length]);

    return (
        <div className="image-slider">
            {images.map((image, index) => (
                <div
                    key={index}
                    className={`slide ${index === activeIndex ? 'active' : ''}`}
                >
                    <img
                        src={image}
                        alt={`Slide ${index + 1}`}
                        style={{ maxWidth: '100%', maxHeight: '450px' }}
                    />
                </div>
            ))}
        </div>
    );
}

export default ImageSlider;
