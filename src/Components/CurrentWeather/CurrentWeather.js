import React, {useState, useEffect} from 'react'
import './CurrentWeather.css'
import axios from 'axios'
import {RotatingLines} from 'react-loader-spinner'

function CurrentWeather() {
    const [currentWeather, getCurrent] = useState([])
    const [isLoading, setLoading] = useState(true)
    
    useEffect(() => {
        console.log('hitting useEffect!!!')
        getCurrentLocation()
    },[])

    const getCurrentLocation = () => {
        console.log('hit')
        if(!navigator.geolocation) {
            alert('Geolocation is not allowed!')
            //add functionality to get set weather from specific city
        } else {
            const handleSuccess = position => {
                const {latitude, longitude} = position.coords
                getLocalWeather(latitude,longitude)
            }
            const handleError = error => {
                console.log({message: error})
            }
            navigator.geolocation.getCurrentPosition(handleSuccess, handleError)
        }
        
    }
    
    const getLocalWeather = (lat, lon) => {
            console.log('hitting lat lon', lat, lon)
            axios.get(`/api/weather/current/location/${lat}/${lon}`).then(res => {
            getCurrent(res.data)
            setLoading(false)
        })
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