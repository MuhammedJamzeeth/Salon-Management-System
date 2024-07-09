import React from "react";
import Home from "./Pages/Home";
import { Route, Routes,Navigate } from "react-router-dom";
import ServicesPage from "./Pages/ServicesPage";
import AboutUsPage from "./Pages/AboutUsPage";
import BookingService from "./Pages/BookingService/BookingService";
import {BarberShopServiceDetails} from "./Pages/service";

function App() {
  return (
    <div className="App">
      <React.Fragment>
      <Routes>
        <Route path="/" element={<Home />} /> 
        
         */}
          <Route path="services" element={<ServicesPage/>}/> 
        
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
      </Routes>
    </React.Fragment>
    </div>
  );
}

export default App;
