import React, {useState, useEffect} from 'react'
import axios from 'axios'
import './App.css';
import { Circles } from 'react-loader-spinner';
import CurrentWeather from './Components/CurrentWeather/CurrentWeather'
import FiveDay from './Components/FiveDay/FiveDay';
import DailyDetails from './Components/DailyDetails/DailyDetails';


function App() {
  
  const [currentLocation, setLocation] = useState({cordinates: {lat: '', lon:''}})
  const [weather, setWeather] = useState([])
  const [isLoading, setLoading] = useState(true)
  
  const getCurrentLocation = () => {
    if(!navigator.geolocation) {
        alert('Geolocation is not allowed!')
        //add functionality to get set weather from specific city
    } else {
        const handleSuccess = position => {
          console.log(position)
          const {longitude, latitude} = position.coords
          setLocation({
            cordinates: {
              lat: latitude,
              lon: longitude
            }
          })
          setLoading(false)
          console.log(currentLocation)
          getWeather()
        }
        const handleError = error => {
          console.log({message: error})
        }
        navigator.geolocation.getCurrentPosition(handleSuccess, handleError)
    }
  }

  const getWeather = () => {
    console.log('current request', currentLocation.cordinates)
    axios.get(`/api/weather/location/${lat}/${lon}`).then(res => {
      setWeather(res.data)
      console.log('Hello Weather!!!', res.data)
    })
  }

  
  useEffect(() => {
    getCurrentLocation()
  },[])

  
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
            <CurrentWeather weatherData={weather}/>
              <h2></h2>
            </div>
            <FiveDay weatherData={weather}/>
            <DailyDetails weatherData={weather}/>
            </div>
          } 
        </div>
    </div>
  );
}

export default App;
