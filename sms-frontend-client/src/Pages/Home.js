import React from 'react'
import NavigationBar from "../Components/NavigationBar";
import ImageSlider from "../Components/ImageSlider";
import Services from "../Components/Services";
import AboutUs from '../Components/About';
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