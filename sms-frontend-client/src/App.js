import React from "react";
import NavigationBar from "./Components/NavigationBar";
import ImageSlider from "./Components/ImageSlider";
import Services from "./Components/Services";
import Reviews from "./Components/Reviews/Reviews";

function App() {
  return (
    <div className="App">
      <NavigationBar/>
      <ImageSlider/>
      <Services/>
      {/* <Reviews /> */}
    </div>
  );
}

export default App;
