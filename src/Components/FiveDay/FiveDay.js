import React, { useState, useEffect } from 'react'
import { RotatingLines } from 'react-loader-spinner'
import FadeIn from 'react-fade-in'
import './FiveDay.css'

function FiveDay(props) {
    
  const [isLoading, setLoading] = useState(true)

    const checkFiveDayProps = (props) => {
      if(props) {
        setLoading(false)
      }
    }
    
     useEffect(() => {
       checkFiveDayProps(props)
    }, [])
    
    const {weatherData} = props
    return (
        <div className='FiveDay'>
          
        {isLoading ? 
          <div className='loader-container'>
            <RotatingLines width="100" strokeColor="#fff"/>
          </div>
          :
          <div className='five-day-container'>
            <FadeIn transitionDuration={1200}>
            <h3>Five Day Forcast</h3>
            <ul>
              <li className="day-container">
                <h5>{weatherData.forecasts[0].day}</h5>
                <img src="icons/rain.svg" alt="" className="weather-icon" />
                <div className="five-day-high">{weatherData.forecasts[0].high}°</div>
                <div className="five-day-low">{weatherData.forecasts[0].low}°</div>
              </li>
              <li className="day-container">
                <h5>{weatherData.forecasts[1].day}</h5>
                <img src="icons/rain.svg" alt="" className="day-image" />
                <div className="five-day-high">{weatherData.forecasts[1].high}°</div>
                <div className="five-day-low">{weatherData.forecasts[1].low}°</div>
              </li>
              <li className="day-container">
                <h5>{weatherData.forecasts[2].day}</h5>
                <img src="icons/rain.svg" alt="" className="day-image" />
                <div className="five-day-high">{weatherData.forecasts[2].high}°</div>
                <div className="five-day-low">{weatherData.forecasts[2].low}°</div>
              </li>
              <li className="day-container">
                <h5>{weatherData.forecasts[3].day}</h5>
                <img src="icons/rain.svg" alt="" className="day-image" />
                <div className="five-day-high">{weatherData.forecasts[3].high}°</div>
                <div className="five-day-low">{weatherData.forecasts[3].low}°</div>
              </li>
              <li className="day-container">
                <h5>{weatherData.forecasts[4].day}</h5>
                <img src="icons/rain.svg" alt="" className="day-image" />
                <div className="five-day-high">{weatherData.forecasts[4].high}°</div>
                <div className="five-day-low">{weatherData.forecasts[4].low}°</div>
              </li>
            </ul>
              </FadeIn>
          </div>
        }

        </div>
    )
}

export default FiveDay