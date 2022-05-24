import React, {useState, useEffect} from 'react'
import axios from 'axios'
import './App.css';
import { Circles } from 'react-loader-spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGear, faLocationArrow, faMagnifyingGlass, faX } from '@fortawesome/free-solid-svg-icons'
import CurrentWeather from './Components/CurrentWeather/CurrentWeather'
import FiveDay from './Components/FiveDay/FiveDay';
import DailyDetails from './Components/DailyDetails/DailyDetails';


function App() {
  
  const [currentWeather, setWeather] = useState([])
  const [isLoading, setLoading] = useState(true)
  const [cityList, setCityList] = useState([])
  const [toggleSearch, setToggleSearch] = useState(false)
  
  const getCurrentLocation = () => {
    if(!navigator.geolocation) {
        console.log('Geolocation services has been disabled by user')
        getDefaultWeather()
    } else {
        const handleSuccess = position => {
          const {latitude, longitude} = position.coords
          getCurrentWeather(latitude, longitude)
        }
        const handleError = err => {
          console.log({errorMessage: `${err}`}) 
        }
        navigator.geolocation.getCurrentPosition(handleSuccess, handleError)
    }
  }

  const getDefaultWeather = () => {
    axios.get('/api/weather/default').then(res => {
      setWeather(res.data)
      setLoading(false)
    })
  }

  const getCurrentWeather = (lat, lon) => {
    axios.get(`/api/weather/location/${lat}/${lon}`).then(res => {
      setWeather(res.data)
      setLoading(false)
    })
  }

  const getCitiesList = (input) => {
    axios.get(`/api/cities/${input}`).then(res => {
      setCityList(res.data)
    })
  }

  const handleCitiesSearch = (input) => {
    if(input.length > 2) {
      getCitiesList(input)   
    } else {
      return null
    }
  }
  
  const weatherSearch = (city) => {
    axios.get(`/api/weather/location/${city}`).then(res => {
      setWeather(res.data)
    })
  }

  useEffect(() => {
    getCurrentLocation()
  },[])
  
  const mappedCitiesList = cityList.map((city, index) => {
    return(
      <div index={city.id} onClick={() => (weatherSearch(city.name), setToggleSearch(false), setCityList([]))} className="city-list">
        <div>
          <span>{city.name}</span>
          <span>( {city.country.id} )</span>
        </div>
        <span>{city.adminDivision1.name}</span>
      </div>
    )
  })
  
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
                        <span><FontAwesomeIcon icon={faLocationArrow}/></span>
                        <span>{currentWeather.location.city},{currentWeather.location.region}</span>
                        <span><FontAwesomeIcon icon={faMagnifyingGlass} onClick={() => setToggleSearch(!toggleSearch)} /></span>
                      </li>
                    <li>News</li>
                  </ul>
                </nav> 
                {toggleSearch ?
                <div className="search-container">
                  <span><FontAwesomeIcon icon={faX} onClick={() => setToggleSearch(false)} /></span>
                  <span><FontAwesomeIcon icon={faMagnifyingGlass} /></span>
                  <input 
                    type="text" 
                    list='cities' 
                    placeholder='City, State, Country, Region' 
                    autoComplete='off' 
                    onChange={(e) => (handleCitiesSearch(e.target.value))}
                    onKeyDown={(e) => e.key === 'Enter' ? (weatherSearch(e.target.value), setToggleSearch(false)) : null}
                  />
                  
                </div>
                :
                null
                }
                {toggleSearch ?
                <div className='city-list-container'>
                  {mappedCitiesList}
                </div>
                :
                null
                }
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
