import React, {useState, useEffect} from 'react'
import axios from 'axios'
import './App.css';
import { Circles, RotatingLines } from 'react-loader-spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGear, faLocationArrow, faMagnifyingGlass, faX, faNewspaper } from '@fortawesome/free-solid-svg-icons'
import CurrentWeather from './Components/CurrentWeather/CurrentWeather'
import FiveDay from './Components/FiveDay/FiveDay';
import DailyDetails from './Components/DailyDetails/DailyDetails';
import News from './Components/News/News'


function App() {
  
  const [currentWeather, setWeather] = useState([])
  const [isLoading, setLoading] = useState(true)
  const [isLoadingCities, setLoadingCities] = useState(false)
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
      setLoadingCities(false)
    })
  }

  const handleCitiesSearch = (input) => {
    if(input.length >= 2) {
      setLoadingCities(true)
      getCitiesList(input)
    } 
    if(input.length <= 2) {
      setCityList([])
    }
    if(input.length === 0){
      setLoadingCities(false)
    }
  }

  const handleOnKeyDownSearch = (e) => {
    if(e.key === 'Enter') {
      weatherSearch(e)
      setToggleSearch(false)
    } 
    if(e.key === 'Backspace') {
      handleCitiesSearch(e)
    }
  }
  
  const weatherSearch = (city) => {
    axios.get(`/api/weather/location/${city}`).then(res => {
      setWeather(res.data)
      console.log('weather data', res.data)
    })
  }

  useEffect(() => {
    getCurrentLocation()
  },[])
  
  const mappedCitiesList = cityList.map((city, index) => {
    return(
      <div key={index} onClick={() => (weatherSearch(city.name), setToggleSearch(false), setCityList([]))} className="city-list">
          <span>{city.name},</span>
          {city.adminDivision1 ? <span>{city.adminDivision1.name}</span> : null}{' '}
          <span>( {city.country.id} )</span>
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
                <nav>
                  <ul>
                    <li><FontAwesomeIcon icon={faGear}/></li>
                      <li>
                        <span><FontAwesomeIcon icon={faLocationArrow}/></span>
                        <marquee className='location-info-mobile' direction='left' scrollamount='2'>
                          <span>{currentWeather.location.city},{currentWeather.location.region}</span>
                        </marquee>
                          <span className='location-info'>{currentWeather.location.city},{currentWeather.location.region}</span>
                        <span><FontAwesomeIcon icon={faMagnifyingGlass} onClick={() => setToggleSearch(!toggleSearch)} /></span>
                      </li>
                    <li>
                      <a href="//#News">
                        <span><FontAwesomeIcon icon={faNewspaper} /></span>
                        News
                      </a>
                    </li>
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
                    onChange={(e) => (handleCitiesSearch(e.target.value))}
                    onKeyDown={(e) => {handleOnKeyDownSearch(e.target.value)}}
                  />
                  <div className="loading-cities-container">
                    {isLoadingCities ? <><RotatingLines /></> : null}
                  </div>
                </div>
                :
                null
                }
                {toggleSearch ?
                  <div className='city-list-container'>
                    {!isLoadingCities ?
                      <>
                        {mappedCitiesList}
                      </>
                    :
                      null
                    }
                  </div>
                  :
                  null
                }
              <div className="image-banner">
                <CurrentWeather weatherData={currentWeather}/>
              </div>
              <FiveDay weatherData={currentWeather}/>
              <DailyDetails weatherData={currentWeather}/>
              <News />
            </div>
          } 
    </div>
  );
}

export default App;
