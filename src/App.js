import React, {useState, useEffect} from 'react'
import axios from 'axios'
import './App.css';
import { Circles } from 'react-loader-spinner';
import Nav from './Components/Nav/Nav';
import CurrentWeather from './Components/CurrentWeather/CurrentWeather'
import CityViewSlider from './Components/CityViewSlider/CityViewSlider';
import FiveDay from './Components/FiveDay/FiveDay';
import DailyDetails from './Components/DailyDetails/DailyDetails';
import News from './Components/News/News'
import SearchModal from './Components/SearchModal/SearchModal';
import ArticleModal from './Components/ArticleModal/ArticleModal';
import Footer from './Components/Footer/Footer';


function App() {
  
  const [currentWeather, setWeather] = useState([])
  const [currentLocation, setCurrentLocation] = useState([])
  const [isLoading, setLoading] = useState(true)
  const [searchModal, setSearchModal] = useState(false)
  const [recentSearches, setRecentSearches] = useState([])
  const [article, setArticle] = useState({})
  const [articleModal, setArticleModal] = useState(false)
  const [weatherUnit, setWeatherUnit] = useState('f')

  const getCurrentLocation = () => {
    if(!navigator.geolocation) {
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
  
  const getCurrentWeather = (lat, lon) => {
    axios.get(`/api/weather/location/${lat}/${lon}/${weatherUnit}`).then(res => {
      setWeather(res.data)
      setCurrentLocation(res.data)
      setLoading(false)
    })
  }

  const getDefaultWeather = () => {
    axios.get(`/api/weather/default/${weatherUnit}`).then(res => {
      setWeather(res.data)
      setLoading(false)
    })
  }

  const handleSearchModal = () => {
    setSearchModal(!searchModal)
  }

  const handleArticleModal = (article) => {
    setArticle(article)
    setArticleModal(!articleModal)
  }

  useEffect(() => {
    getCurrentLocation()
  },[weatherUnit])

    
  return (
    <div className="App">
      {isLoading ? 
        <div className='main-loader-container'>
          <Circles ariaLabel="loading-indicator" color='#fff' height='150' width='150' />
          <h2>Loading Weather</h2>
        </div>
        :
        <div className='app-container'>
          <Nav searchModal={searchModal} setSearchModal={setSearchModal} weatherData={currentWeather} weatherUnit={weatherUnit} setWeatherUnit={setWeatherUnit}/>
          {searchModal ? 
            <SearchModal 
              setSearchModal={setSearchModal} 
              setWeather={setWeather}  
              weatherUnit={weatherUnit} 
              currentLocation={currentLocation}
              recentSearches={recentSearches}
              setRecentSearches={setRecentSearches}
            />
          : 
            null
          }
          {articleModal ? <ArticleModal article={article} setArticleModal={setArticleModal}  /> : null}  
          <CityViewSlider />
          <CurrentWeather weatherData={currentWeather} weatherUnit={weatherUnit}/>
          <div className="desktop-view">
            <FiveDay weatherData={currentWeather} weatherUnit={weatherUnit}/>
            <DailyDetails weatherData={currentWeather} weatherUnit={weatherUnit}/>
          </div>
          <News handleArticleModal={handleArticleModal}/>
          <Footer />
        </div>
      } 
    </div>
  );
}

export default App;
