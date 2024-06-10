import React from 'react'
import NavigationBar from "../Components/NavBar/NavigationBar";
import ImageSlider from "../Components/ImageSlider/ImageSlider";
import Services from "../Components/Service/Services";
import AboutUs from '../Components/AboutUs/About';
import Footer from '../Components/Footer/Footer';

function Home() {
    return (
        <>
            <NavigationBar></NavigationBar>
            <ImageSlider></ImageSlider>
            <AboutUs> </AboutUs>
            <Services> </Services>
            <Footer></Footer>
        </>
    )
}

export default Home