import React from 'react'
import NavigationBar from "../components/NavBar/NavigationBar";
import ImageSlider from "../components/ImageSlider/ImageSlider";
import Services from "../components/Service/Services";
import AboutUs from '../components/AboutUs/About';
import Footer from '../components/Footer/Footer';
<<<<<<< Updated upstream
import Reviews from '../components/Reviews/Reviews';

=======
import GoogleMap from '../components/Googlemap';
>>>>>>> Stashed changes

function Home() {
    return (
        <>
            <NavigationBar></NavigationBar>
            <ImageSlider></ImageSlider>
            <AboutUs> </AboutUs>
<<<<<<< Updated upstream
            <Services> </Services>
            <Reviews></Reviews>
=======
            <GoogleMap />
            {/* <Services> </Services> */}
>>>>>>> Stashed changes
            <Footer></Footer>
        </>
    )
}

export default Home