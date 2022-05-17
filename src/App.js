import React, {useState, useEffect} from 'react'
import './App.css';
import CurrentWeather from './Components/CurrentWeather/CurrentWeather'

function App() {
  
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
  useEffect(() => {
    getCurrentLocation()
  }, [])

  return (
    <div className="App">
        <div className='weather-dashboard'>
          <CurrentWeather />
        </div>
    </div>
  );
}

export default App;
