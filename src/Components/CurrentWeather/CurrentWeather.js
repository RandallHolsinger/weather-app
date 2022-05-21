import React, { useState, useEffect } from 'react'
import './CurrentWeather.css'
import { RotatingLines } from 'react-loader-spinner'

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

    return (
        <div className='CurrentWeather'>
            {isLoading ?
              <div className='loader-container'>
                <RotatingLines width="100" strokeColor="#fff"/>
              </div>
              :
              <div className='current-weather-container'>
                <div className='current-desc'>
                  <h2>{props.weatherData.location.city}{', '}{props.weatherData.location.region}</h2>
                  <h3>{props.weatherData.location.country}</h3>
                  <h4>{props.weatherData.current_observation.condition.temperature}°</h4>
                  <h4>{props.weatherData.current_observation.condition.text}</h4>
                </div>
                  image location
              </div> 
            }
        </div>
    )
}

export default CurrentWeather