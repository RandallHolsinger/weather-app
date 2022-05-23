import React, {useState, useEffect} from 'react'
import axios from 'axios'
import './App.css';
import { Circles, RotatingLines } from 'react-loader-spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGear, faLocationArrow, faMagnifyingGlass, faX } from '@fortawesome/free-solid-svg-icons'
import CurrentWeather from './Components/CurrentWeather/CurrentWeather'
import FiveDay from './Components/FiveDay/FiveDay';
import DailyDetails from './Components/DailyDetails/DailyDetails';


function App() {
  
  const [currentWeather, setWeather] = useState([])
  const [isLoading, setLoading] = useState(true)
  const [searchInput, setInput] = useState('')
  const [weatherSearched, setWeatherFromSearch] = useState('')
  const [toggleSearch, setToggleSearch] = useState(false)
  const [isLoadingSearch, setLoadingSearch] = useState(false)
  
  const getCurrentLocation = () => {
    if(!navigator.geolocation) {
        console.log('Geolocation services has been disabled by user')
        //Sets a default city if location services are deactivated by user
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
      console.log('Data', res.data)
    })
  }

  const weatherSearch = (input) => {
    console.log(input)
    axios.get(`/api/weather/location/${input}`).then(res => {
      setWeatherFromSearch(res.data)
      setLoadingSearch(false)
      console.log('search results', res.data)
    })
  }

  
  useEffect(() => {
    getCurrentLocation()
  },[])

  
  return (
    <div className="App">
          {isLoading ? 
            <div className='main-loader-container'>
              <Circles ariaLabel="loading-indicator" color='#fff' height='150' width='150' />
              <h2>Loading Weather</h2>
            </div>
            :
            <div className='app-container'>
              <div className="image-banner">
                <nav>
                  <ul>
                    <li><FontAwesomeIcon icon={faGear}/></li>
                      <li>
                        <FontAwesomeIcon icon={faLocationArrow}/>
                        {' '}{currentWeather.location.city},{currentWeather.location.region}{' '}
                        <FontAwesomeIcon icon={faMagnifyingGlass} onClick={() => setToggleSearch(!toggleSearch)} />
                      </li>
                    <li>News</li>
                  </ul>
                  {toggleSearch ?
                  <div className="search-container">
                    <span><FontAwesomeIcon icon={faX} /></span>
                    <span><FontAwesomeIcon icon={faMagnifyingGlass} /></span>
                    <input type="text" placeholder='Search' onChange={(e) => setInput(e.target.value)}></input>
                    {isLoadingSearch ? 
                      <div className="search-loading-container">
                        <RotatingLines width="30" strokeColor="#fff"/>
                      </div>
                      :
                      <button onClick={() => {setLoadingSearch(true); weatherSearch(searchInput)}}>Search</button>
                    }
                  </div>
                  :
                  null
                  }
                </nav> 
                <CurrentWeather weatherData={currentWeather}/>
              </div>
              <FiveDay weatherData={currentWeather}/>
              <DailyDetails weatherData={currentWeather}/>
            </div>
          } 
    </div>
  );
}

export default App;
