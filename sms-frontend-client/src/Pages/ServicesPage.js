// import React from 'react';
// import NavigationBar from '../Components/NavBar/NavigationBar';
// import Footer from '../Components/Footer/Footer';
// import ServiceCard from '../Components/ServiceCard/ServiceCard';
// import ServiceCard2 from '../Components/ServiceCard2/ServiceCard2';
// import imageSrc from '../Resources/about.jpg';
// import img from '../Resources/haircut.jpg';

// export default function ServicesPage() {
//     const serviceName = "New Service";
//     const serviceDescription = "This is a new service";
//     const para = "Welcome to our sanctuary of style and sophistication. Step into a world where expertise meets innovation, where each strand tells a story of artistry and elegance. Indulge in revitalizing treatments tailored to elevate your beauty and wellbeing. Our exquisitely designed salon invites you to unwind and rejuvenate amidst a symphony of serenity. Discover a haven where beauty meets brilliance and dreams take flight.";

//     return (
//         <>
//             <NavigationBar></NavigationBar>
//             <div className='title' style={{ textAlign: "center", margin: "10px" }}>
//                 <style>
//                     {`
//                     .title {
//                         animation: fadeIn 2s ease-in-out;
//                         transition: transform 0.3s, color 0.3s;
//                     }

//                     .title:hover {
//                         transform: scale(1.05);
//                         color: #007BFF;
//                     }

//                     .title h1 {
//                         color: #8000ff;
//                         font-size: 2.5em;
//                         margin-bottom: 10px;
//                         text-transform: uppercase;
//                         letter-spacing: 2px;
//                         transition: color 0.3s;
//                     }

//                     .title p {
//                         font-size: 1.1em;
//                         color: #555;
//                     }

//                     @keyframes fadeIn {
//                         0% { opacity: 0; }
//                         100% { opacity: 1; }
//                     }

//                     .title h1:hover {
//                         color: #666699;
//                     }
//                     `}
//                 </style>
//                 <h1>Our Services</h1>
//                 <p>{para}</p>
//             </div>
//             <div className='service-card'>
//                 <ServiceCard serviceName={serviceName} description={serviceDescription} imageSrc={imageSrc}></ServiceCard>
//             </div>
//             <div className='service-card2'>
//                 <ServiceCard2 serviceName={serviceName} description={serviceDescription} imageSrc={img}></ServiceCard2>
//             </div>
            
//             <Footer></Footer>
//         </>
//     );
// }
import React from 'react';
import NavigationBar from '../Components/NavBar/NavigationBar';
import Footer from '../Components/Footer/Footer';
import ServiceCard from '../Components/ServiceCard/ServiceCard';
import ServiceCard2 from '../Components/ServiceCard2/ServiceCard2';
import imageSrc from '../Resources/about.jpg';
import img from '../Resources/haircut.jpg';
import AllServices from '../Components/Service/AllServices';

export default function ServicesPage() {
    const serviceName = "New Service";
    const serviceDescription = "This is a new service";
    const para = "Welcome to our sanctuary of style and sophistication. Step into a world where expertise meets innovation, where each strand tells a story of artistry and elegance. Indulge in revitalizing treatments tailored to elevate your beauty and wellbeing. Our exquisitely designed salon invites you to unwind and rejuvenate amidst a symphony of serenity. Discover a haven where beauty meets brilliance and dreams take flight.";

    return (
        <>
            <NavigationBar></NavigationBar>
            <div className='title' style={{ textAlign: "center", margin: "10px" }}>
                <style>
                    {`
                    .title {
                        animation: fadeIn 2s ease-in-out;
                        transition: transform 0.3s, color 0.3s;
                    }

                    .title:hover {
                        transform: scale(1.05);
                        color: #007BFF;
                    }

                    .title h1 {
                        color: #8000ff;
                        font-size: 2.5em;
                        margin-bottom: 15px;
                        text-transform: uppercase;
                        letter-spacing: 2px;
                        transition: color 0.3s;
                    }

                    .title p {
                        font-size: 1.1em;
                        color: #555;
                    }

                    @keyframes fadeIn {
                        0% { opacity: 0; }
                        100% { opacity: 1; }
                    }

                    .title h1:hover {
                        color: #666699;
                    }

                    .service-card, .service-card2 {
                        animation: fadeIn 2.5s ease-in-out;
                        margin: 20px auto;
                        width: 80%;
                        max-width: 1200px;
                        transition: transform 0.3s, box-shadow 0.3s;
                    }

                    .service-card:hover, .service-card2:hover {
                        transform: scale(1.02);
                        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                    }

                    `}
                </style>
                <h1>Our Services</h1>
                <p>{para}</p>
            </div>
            <div className='service-card'>
                <ServiceCard serviceName={serviceName} description={serviceDescription} imageSrc={imageSrc}></ServiceCard>
            </div>
            <div className='service-card2'>
                <ServiceCard2 serviceName={serviceName} description={serviceDescription} imageSrc={img}></ServiceCard2>
            </div>
            <AllServices></AllServices>
            <Footer></Footer>
        </>
    );
}
