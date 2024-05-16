import React from 'react'
import './about.css';
import image from '../../Resources/about.jpg';

function AboutUs() {
    return (
        <div className='container'>
            <div className='box'>
                <img className='about-img' src={image} alt='About Us' />
            </div>
            <div className='about-para'>
                <h3 className='about-h'>About Us</h3>
                <p> Welcome to Corner Barber Salon where Style Meets Tradition! With our skilled barbers and cozy atmosphere,
                    we are dedicated to delivering exceptional cuts, shaves, and grooming experince tailored to evry client.
                    Step into our saloon and experince the timeless art of barbering fused with contomporary flair.</p>
            </div>
        </div>
    );
}

export default AboutUs;