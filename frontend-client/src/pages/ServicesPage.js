import React, { useState } from 'react';
import './ServicesPage.css'; // Import the CSS file
import NavigationBar from '../components/NavBar/NavigationBar';
import Footer from '../components/Footer/Footer';
import ServiceCard from '../components/ServiceCard/ServiceCard';
import ServiceCard2 from '../components/ServiceCard2/ServiceCard2';
import imageSrc from '../Resources/about.jpg';
import img from '../Resources/haircut.jpg';
import AllServices from '../components/Service/AllServices';
import ServiceSlider from '../components/Service/ServiceSlider';
// Import the icons for light and dark mode
import { FaSun, FaMoon } from 'react-icons/fa'; 

export default function ServicesPage() {
    const [darkMode, setDarkMode] = useState(false);
    const para = "Welcome to our sanctuary of style and sophistication. Step into a world where expertise meets innovation, where each strand tells a story of artistry and elegance. Indulge in revitalizing treatments tailored to elevate your beauty and wellbeing. Our exquisitely designed salon invites you to unwind and rejuvenate amidst a symphony of serenity. Discover a haven where beauty meets brilliance and dreams take flight.";

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    return (
        <div className={darkMode ? 'dark-mode' : 'light-mode'}>
            <NavigationBar />
            <button className='toggle-button' onClick={toggleDarkMode}>
                {darkMode ? <FaSun /> : <FaMoon />}
            </button>
            <div className='title'>
                <h1>Our Services</h1>
                <p>{para}</p>
            </div>
            <div className='service-card'>
                <ServiceCard imageSrc={imageSrc} />
            </div>
            <ServiceSlider />
            <div className='service-card2'>
                <ServiceCard2 imageSrc={img} />
            </div>
            <AllServices />
            <Footer />
        </div>
    );
}
