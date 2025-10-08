import React from 'react'
import AboutUs from '../components/AboutUs/About'
import NavigationBar from '../components/NavBar/NavigationBar'
import Footer from '../components/Footer/Footer'

function AboutUsPage() {
    return (
        <>
            <NavigationBar></NavigationBar>
            <AboutUs></AboutUs>
            <Footer></Footer>
        </>
    )
}

export default AboutUsPage