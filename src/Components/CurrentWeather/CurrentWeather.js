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
    
    const {weatherData, weatherUnit} = props
    return (
        <div className='CurrentWeather'>
            {isLoading ?
              <div className='loader-container'>
                <RotatingLines width="100" strokeColor="#fff"/>
              </div>
              :
              <div className='current-weather-container'>
                <div className='current-weather-info'>
                  <div className="temp-desc">
                    <h2>{weatherData.current_observation.condition.temperature}°</h2>
                    <h4>{weatherData.current_observation.condition.text}</h4>
                    <h4>High:{' '}{weatherData.forecasts[0].high}{weatherUnit === 'f' ? '°F' : '°C'}{' '}•{' '}Low:{' '}{weatherData.forecasts[0].low}{weatherUnit === 'f' ? '°F' : '°C'}</h4>
                  </div>
                  <div className="current-weather-icon">
                    <WeatherIcon code={weatherData.current_observation.condition.code} />
                  </div>
                </div>
              </div> 
            }
        </div>
    )
}

export default CurrentWeather