import React, { useState } from 'react';
import { FaPhoneAlt, FaEnvelope, FaWhatsapp, FaTelegramPlane } from 'react-icons/fa';
import axios from 'axios';
import './ContactPage.css';

const ContactPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const contactDetails = {
            name,
            email,
            phoneNumber,
            message,
        };

        try {
            await axios.post('http://localhost:8080/api/contact', contactDetails);
            alert('Message sent successfully!');
            setName('');
            setEmail('');
            setPhoneNumber('');
            setMessage('');
        } catch (error) {
            console.error('There was an error sending the message!', error);
            alert('Failed to send message. Please try again later.');
        }
    };

    const handleWhatsAppClick = () => {
        const phoneNumber = "+94764177433"; 
        const message = encodeURIComponent("Hello, I have a question.");
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
        window.open(whatsappUrl, '_blank');
    };

    return (
        <div className="contact-page">
            <div className="contact-info">
                <h2>Have Some Questions?</h2>
                <p>Don't hesitate to contact us.</p>
                <div className="contact-methods">
                    <div className="contact-method">
                        <FaPhoneAlt className="icon" />
                        <span>SL: +94764177433</span>
                    </div>
                    <div className="contact-method">
                        <FaEnvelope className="icon" />
                        <span>fato786@yahoo.com</span>
                    </div>
                    <div className="contact-method" onClick={handleWhatsAppClick} style={{ cursor: 'pointer' }}>
                        <FaWhatsapp className="icon" />
                        <span>WhatsApp</span>
                    </div>
                    <div className="contact-method">
                        <FaTelegramPlane className="icon" />
                        <span>Telegram</span>
                    </div>
                </div>
            </div>
            <div className="contact-form-container">
                <form className="contact-form" onSubmit={handleSubmit}>
                    <h2>Get in Touch</h2>
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <input
                        type="email"
                        placeholder="E-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="tel"
                        placeholder="Phone Number"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        required
                    />
                    <textarea
                        placeholder="Your Message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                    ></textarea>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default ContactPage;
