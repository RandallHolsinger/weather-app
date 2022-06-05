import React from 'react'
import './CityViewSlider.css'
import Slider from 'react-carousel-responsive';
import 'react-carousel-responsive/dist/styles.css';

function CityViewSlider() {


  return(
    <div className="CityViewSlider">
      <Slider autoplay={true} autoplaySpeed={5000} speed={500}>
        <div className="slide"><img src='images/banner-image.jpg' alt='banner'/></div>
        <div className="slide"><img src='images/banner-image.jpg' alt='banner'/></div>
        <div className="slide"><img src='images/banner-image.jpg' alt='banner'/></div>
        <div className="slide"><img src='images/banner-image.jpg' alt='banner'/></div>
        <div className="slide"><img src='images/banner-image.jpg' alt='banner'/></div>
      </Slider>
    </div>
  )
}

export default CityViewSlider