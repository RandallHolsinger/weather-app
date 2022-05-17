import React, {useState, useEffect} from 'react'
import axios from 'axios'

function CurrentWeather() {
    const [currentWeather, getCurrent] = useState([])
    

    const getCurrentLocation = () => {
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
            axios.get(`/api/weather/current/location/${lat}/${lon}`).then(res => {
            getCurrent(res.data)
        })
    }

    useEffect(() => {
        getCurrentLocation()
    },[])

    


    return (
        <div className='CurrentWeather'>
            <p>City:{currentWeather.data[0].city_name}{', '}{currentWeather.data[0].state_code}</p>
            <p>Temp:{currentWeather.data[0].temp}</p>
            <p>Description:{currentWeather.data[0].weather.description}</p>
            <img className='weather-icon' src={`icons/${currentWeather.data[0].weather.icon}.png`} alt='weather' />
            <p>precipitation:{currentWeather.data[0].precip}</p>
            <p>visability:{currentWeather.data[0].vis}</p> 
        </div>
    )
}

export default CurrentWeather