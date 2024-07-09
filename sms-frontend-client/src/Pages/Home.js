import React from 'react'
import NavigationBar from "../components/NavBar/NavigationBar";
import ImageSlider from "../components/ImageSlider/ImageSlider";
import Services from "../components/Service/Services";
import AboutUs from '../components/AboutUs/About';
import Footer from '../components/Footer/Footer';
import Reviews from '../components/Reviews/Reviews';


function Home() {
    return (
        <>
            <NavigationBar></NavigationBar>
            <ImageSlider></ImageSlider>
            <AboutUs> </AboutUs>
            <Services> </Services>
            <Reviews></Reviews>
            <Footer></Footer>
        </>
    )
}

export default Home