import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faPhoneVolume, faEnvelope, faPaperPlane } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
  return (
    <>
      <footer className="Footer">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <h3>CORNER BARBER</h3>
              <div className="footer-icons">
                <FontAwesomeIcon icon={faFacebook} />
                <FontAwesomeIcon icon={faInstagram} />
              </div>
            </div>
            <div className="col-md-3">
              <h5>Quick Links</h5>
              <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/">Service</a></li>
                <li><a href="/">Contact Us</a></li>
                <li><a href="/">Products</a></li>
                <li><a href="/">About Us</a></li>
              </ul>
            </div>
            <div className="col-md-4">
              <h5>Contact Info</h5>
              <p><FontAwesomeIcon icon={faPhoneVolume} /> 076 4177433 </p>
              <p><FontAwesomeIcon icon={faEnvelope} /> fato786@yahoo.com </p>
              <p><FontAwesomeIcon icon={faPaperPlane} /> Send us a message</p>
            </div>
          </div>
        </div>
        <div className='Last-footer'>
          <p>Copyright 2024 Corner Barber.lk. All rights reserved.</p>
        </div>
      </footer >
  </>

  );
}

export default Footer;