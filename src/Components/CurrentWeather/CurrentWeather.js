import React, {useState, useEffect} from 'react'
import axios from 'axios'

function CurrentWeather() {
    const [currentWeather, getCurrent] = useState([])
    const [position, setLocation] = useState('')
    

    const getCurrentLocation = () => {
        if(!navigator.geolocation) {
            alert('Geolocation is not allowed!')
        } 
        const handleSuccess = position => {
            const {latitude, longitude} = position.coords
            setLocation({
                latitude,
                longitude
            })
        }
        const handleError = error => {
            console.log({message: error})
        }
        navigator.geolocation.getCurrentPosition(handleSuccess, handleError)
    }
    
    const getLocalWeather = () => {
        axios.get('/api/weather/current').then(res => {
            getCurrent(res.data)
        })
    }

    useEffect(() => {
        getCurrentLocation()
        getLocalWeather()
    },[])

    


    return (
        <div>
            <p>latitude: {position.latitude}</p>
            <p>longitude: {position.longitude}</p>
            {currentWeather.city}
        </div>
    )
}

export default CurrentWeather