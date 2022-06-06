import React from 'react'
import './CityViewSlider.css'
import Slider from 'react-carousel-responsive';
import 'react-carousel-responsive/dist/styles.css';

function CityViewSlider() {


  return(
    <div className="CityViewSlider">
      <Slider autoplay={true} autoplaySpeed={10000} speed={100}>
        <img src={'images/banner-image-1.jpg'} alt='banner' className='slide'/>
        <img src={'images/banner-image-2.jpg'} alt='banner' className='slide'/>
        <img src={'images/banner-image-3.jpg'} alt='banner' className='slide'/>
        <img src={'images/banner-image-4.jpg'} alt='banner' className='slide'/>
        <img src={'images/banner-image-5.jpg'} alt='banner' className='slide'/>
      </Slider>
    </div>
  )
}

export default CityViewSlider