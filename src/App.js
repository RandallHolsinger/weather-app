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


function App() {
  
  const [currentWeather, setWeather] = useState([])
  const [isLoading, setLoading] = useState(true)
  const [searchModal, setSearchModal] = useState(false)
  const [article, setArticle] = useState({})
  const [articleModal, setArticleModal] = useState(false)

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
  
  const getCurrentWeather = (lat, lon) => {
    axios.get(`/api/weather/location/${lat}/${lon}`).then(res => {
      setWeather(res.data)
      setLoading(false)
    })
  }

  const getDefaultWeather = () => {
    axios.get('/api/weather/default').then(res => {
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
          <Nav handleSearchModal={handleSearchModal} weatherData={currentWeather} />
          {searchModal ? <SearchModal handleSearchModal={handleSearchModal} setWeather={setWeather}/> : null}
          {articleModal ? <ArticleModal article={article} setArticleModal={setArticleModal}  /> : null}  
          <CityViewSlider />
          <CurrentWeather weatherData={currentWeather}/>
          <div className="desktop-view">
            <FiveDay weatherData={currentWeather}/>
            <DailyDetails weatherData={currentWeather}/>
          </div>
          <News handleArticleModal={handleArticleModal}/>
        </div>
      } 
    </div>
  );
}

export default App;
