import React, { useState, useEffect } from 'react'
import './CurrentWeather.css'
import { RotatingLines } from 'react-loader-spinner'
import WeatherIcon from '../WeatherIcon/WeatherIcon'

function CurrentWeather(props) {

    const [isLoading, setLoading] = useState(true)
    
    const checkProps = (props) => {
      if(props) {
        setLoading(false)
      } 
    }
    
    useEffect(() => {
      checkProps(props)
    })
    
    const {weatherData} = props
    return (
        <div className='CurrentWeather'>
            {isLoading ?
              <div className='loader-container'>
                <RotatingLines width="100" strokeColor="#fff"/>
              </div>
              :
              <div className='current-weather-container'>
                <div>
                  <h2>{weatherData.location.city}{', '}{weatherData.location.region}</h2>
                  <h3>{weatherData.location.country}</h3>
                  <h4>{weatherData.current_observation.condition.text}</h4>
                  <div className="current-weather-temp">
                    <h2>{weatherData.current_observation.condition.temperature}°</h2>
                    <span><img src={'icons/thermometer-fahrenheit.svg'} alt='temp' /></span>
                  </div>
                </div>
                <div className="current-weather-icon">
                  <WeatherIcon code={weatherData.current_observation.condition.code} />
                </div>
              </div> 
            }
        </div>
    )
}

export default CurrentWeather