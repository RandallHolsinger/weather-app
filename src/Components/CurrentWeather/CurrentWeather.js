import React, { useState, useEffect } from 'react'
import './CurrentWeather.css'
import axios from 'axios'
import { RotatingLines } from 'react-loader-spinner'

function CurrentWeather(props) {
    const [currentWeather, getCurrent] = useState([])
    const [isLoading, setLoading] = useState(true)
    
    useEffect(() => {
        getLocalWeather()
    },[currentWeather])
      
    const getLocalWeather = () => {
            const {lat, lon} = props
            console.log('current request', lat, lon)
            axios.get(`/api/weather/current/location/${lat}/${lon}`).then(res => {
            getCurrent(res.data)
            setLoading(false)
          })
          console.log('current data', currentWeather)
    }

    return (
        <div className='CurrentWeather'>
            {isLoading ?
              <div className='loader-container'>
                <RotatingLines width="100" strokeColor="#fff"/>
              </div>
              :
              <div className='current-weather-container'>
                <div className='current-desc'>
                  <h2>{currentWeather.data[0].city_name}{', '}{currentWeather.data[0].state_code}</h2>
                  <h3>{currentWeather.data[0].temp}°</h3>
                  <h4>{currentWeather.data[0].weather.description}</h4>
                  <h4>precipitation:{currentWeather.data[0].precip}</h4>
                  <h4>visability:{currentWeather.data[0].vis}</h4>
                </div>
                  <img className='weather-icon' src={`icons/${currentWeather.data[0].weather.icon}.png`} alt='weather' />
              </div> 
            }
        </div>
    )
}

export default CurrentWeather