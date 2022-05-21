import React, {useState, useEffect} from 'react'
import axios from 'axios'
import './App.css';
import { Circles } from 'react-loader-spinner';
import CurrentWeather from './Components/CurrentWeather/CurrentWeather'
import FiveDay from './Components/FiveDay/FiveDay';
import DailyDetails from './Components/DailyDetails/DailyDetails';


function App() {
  
  const [weather, setWeather] = useState([])
  const [isLoading, setLoading] = useState(true)
  
  const getCurrentLocation = () => {
    if(!navigator.geolocation) {
        alert('Geolocation is not allowed!')
        //add functionality to get set weather from specific city
    } else {
        const handleSuccess = position => {
          const {latitude, longitude} = position.coords
          getWeather(latitude, longitude)
        }
        const handleError = error => {
          console.log({message: error}) 
        }
        navigator.geolocation.getCurrentPosition(handleSuccess, handleError)
    }
  }

  const getWeather = (lat, lon) => {
    axios.get(`/api/weather/location/${lat}/${lon}`).then(res => {
      setWeather(res.data)
      setLoading(false)
      console.log('Data', weather)
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
