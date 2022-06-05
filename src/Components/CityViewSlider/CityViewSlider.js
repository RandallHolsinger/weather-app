import React from 'react'
import './CityViewSlider.css'
import Slider from 'react-carousel-responsive';
import 'react-carousel-responsive/dist/styles.css';

function CityViewSlider() {


  return(
    <div className="CityViewSlider">
      <Slider autoplay={true} autoplaySpeed={5000} speed={500}>
        <div className="slide"></div>
        <div className="slide"></div>
        <div className="slide"></div>
        <div className="slide"></div>
        <div className="slide"></div>
      </Slider>
    </div>
  )
}

export default CityViewSlider