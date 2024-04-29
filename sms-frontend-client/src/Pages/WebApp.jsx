import React from 'react'
import NavigationBar from "../Components/NavigationBar";
import ImageSlider from "../Components/ImageSlider";
import Services from "../Components/Services";
import AboutUs from '../Components/About';


function WebApp() {
    return (
        <>
            <NavigationBar/>
            <ImageSlider/>
            <AboutUs/>
            <Services/>
        </>
    )
}

export default WebApp
