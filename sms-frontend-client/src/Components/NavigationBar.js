import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import logo from '../Resources/logo.png'
import './NavigationBar.css';

function NavigationBar() {
    return (
        <Navbar className="navbar">
            <Nav href="#home" className="logo-container">
                <img src={logo} alt='img' className='logoimg'></img>
            </Nav>
            <div className="Nav-items"> 
                <Nav>
                    <Nav.Link href="#home">Home</Nav.Link>
                    <Nav.Link href="#aboutus">About Us</Nav.Link>
                    <Nav.Link href="#services">Services</Nav.Link>
                    <Nav.Link href="#products">Products</Nav.Link>
                    <Nav.Link href="#contactus">Contact Us</Nav.Link>
                    <Button variant="outline-light" href="#" className="bookbtn">BOOK NOW</Button>
                </Nav>
            </div>
        </Navbar>
    );
}

export default NavigationBar;
