import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { faPhoneVolume, faEnvelope, faPaperPlane } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
  return (
    <>
      <div className="Footer">
        <div className="container">
          <div className="row">
            <div className="ic">
              <h3><span>CORNER</span>BARBER</h3>
              <p></p>
              <div className="footer-icons">
                <FontAwesomeIcon icon={faFacebook} />
                {/* <FontAwesomeIcon icon={faTwitter} /> */}
                <FontAwesomeIcon icon={faInstagram} />
                {/* <FontAwesomeIcon icon={faLinkedinIn} /> */}
              </div>
            </div>
            <div className="">
              <h5>Quick Links</h5>
              <ul>
                <li className="nav-item">
                  <a className="" href="/">Home</a>
                </li>
                <li className="nav-item">
                  <a className="" href="/">Service</a>
                </li>
                <li className="nav-item">
                  <a className="" href="/">Contact Us</a>
                </li>
                <li className="nav-item">
                  <a className="" href="/">Products</a>
                </li>
                <li className="nav-item">
                  <a className="" href="/">About Us</a>
                </li>
              </ul>
            </div>
            <div className="">
              <h5>Quick Links</h5>
              <p><FontAwesomeIcon icon={faPhoneVolume} /> </p>
              <p><FontAwesomeIcon icon={faEnvelope} /> </p>
              <p><FontAwesomeIcon icon={faPaperPlane} /> </p>
            </div>
          </div>
        </div>
      </div>
      <div className='Last-footer'>
        <p>Copyright  2024 Corner Barber.lk. All rights reserved.</p>
      </div>
    </>
  )
}

export default Footer;
