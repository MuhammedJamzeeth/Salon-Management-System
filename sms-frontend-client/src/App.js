import React from "react";
import Home from "./pages/Home";
import { Route, Routes,Navigate } from "react-router-dom";
import ServicesPage from "./pages/ServicesPage";
import AboutUsPage from "./pages/AboutUsPage";
import BookingService from "./pages/BookingService/BookingService";
import {BarberShopServiceDetails} from "./pages/service";
import ContactPage from "./pages/ContactPage";
import SuccessPage from "./pages/SuccessSubmit/SuccessPage";


function App() {
  return (
    <div className="App">
      <React.Fragment>
      <Routes>
        <Route path="/" element={<Home />} /> 
          <Route path="services" element={<ServicesPage/>}/> 
          <Route path="contact" element={<ContactPage/>} />
        
        {/* </Route> */}
        <Route path="*" element={<Navigate to="/" />} />
        {/* <Route
          element={!currentUserValue ? <Login /> : <Navigate to="/" />}
          path="login"
        />
        <Route
          element={!currentUserValue ? <Register /> : <Navigate to="/" />}
          path="register"
        /> */}
        <Route path={"/service"} element={<BookingService/>} />
          <Route path="/book" element={<BarberShopServiceDetails/>} />
          <Route path="/success" element={<SuccessPage/>} />
      </Routes>
    </React.Fragment>
    </div>
  );
}

export default App;
