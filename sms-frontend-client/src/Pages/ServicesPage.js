import React from 'react'
import NavigationBar from '../Components/NavBar/NavigationBar'
import Footer from '../Components/Footer/Footer'
import ServiceCard from '../Components/ServiceCard/ServiceCard'
import ServiceCard2 from '../Components/ServiceCard2/ServiceCard2'
import imageSrc from '../Resources/about.jpg'

export default function ServicesPage() {
    const serviceName = "New Service";
    const serviceDescription = "This is a new service";
    const para = "Welcome to our sanctuary of style and sophistication. Step into a world where expertise meets innovation, where each strand tells a story of artistry and elegance. Indulge in revitalizing treatments tailored to elevate your beauty and wellbeing. Our exquisitely designed salon invites you to unwind and rejuvenate amidst a symphony of serenity. Discover a haven where beauty meets brilliance and dreams take flight.";
    
    return (
        <>
            <NavigationBar></NavigationBar>
            <div style={{ textAlign:"center",margin:"10px"}}>
                <h1 style={{ }}>Our Services</h1>
                <p>{para}</p>
            </div>
            <ServiceCard serviceName={ serviceName } description={serviceDescription} imageSrc={imageSrc}></ServiceCard>
            {/* <ServiceCard2 serviceName={ serviceName } description={serviceDescription} imageSrc={imageSrc}></ServiceCard2> */}
            {/* <Services></Services> */}
            <Footer></Footer>
        </>
    )
}
