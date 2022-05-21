import React, {useState, useEffect} from 'react'
import './App.css';
import { Circles } from 'react-loader-spinner';
import CurrentWeather from './Components/CurrentWeather/CurrentWeather'
import FiveDay from './Components/FiveDay/FiveDay';
import SixteenDay from './Components/SixteenDay/SixteenDay';


function App() {
  
  const [currentLocation, setLocation] = useState({cordinates: {lat: '', lon:''}})
  const [isLoading, setLoading] = useState(true)
  
  const getCurrentLocation = () => {
    if(!navigator.geolocation) {
        alert('Geolocation is not allowed!')
        //add functionality to get set weather from specific city
    } else {
        const handleSuccess = position => {
          const {longitude, latitude} = position.coords
          setLocation({
            cordinates: {
              lat: latitude,
              lon: longitude
            }
          })
          setLoading(false)
        }
        const handleError = error => {
          console.log({message: error})
        }
        navigator.geolocation.getCurrentPosition(handleSuccess, handleError)
    }
  }
  useEffect(() => {
    getCurrentLocation()
  },[])

  const {lat, lon} = currentLocation.cordinates
  return (
    <div className="App">
        <div className='weather-dashboard'>
          {isLoading ? 
            <div className='main-loader-container'>
              <Circles ariaLabel="loading-indicator" color='#fff' height='150' width='150' />
              <h2>Loading Weather</h2>
            </div>
            :
            <div>
            <div className="image-banner">
            <CurrentWeather lat={lat} lon={lon}/>
              <h2></h2>
            </div>
            <FiveDay lat={lat} lon={lon}/>
            {/* <SixteenDay lat={lat} lon={lon}/> */}
            </div>
          } 
        </div>
    </div>
  );
}

export default App;
