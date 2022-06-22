import React, { useState } from 'react'
import './SearchModal.css'
import { RotatingLines } from 'react-loader-spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faX, faLocationArrow, faCity } from '@fortawesome/free-solid-svg-icons'
import OutsideClickHandler from 'react-outside-click-handler';
import axios from 'axios'

function SearchModal(props) {
  
  const [isLoadingCities, setLoadingCities] = useState(false)
  const [cityList, setCityList] = useState([])
  const [showCityList, setShowCityList] = useState(true)
  
  const getCitiesList = (input) => {
    axios.get(`/api/cities/${input}`).then(res => {
      setCityList(res.data)
      setLoadingCities(false)
    })
  }
  
  const weatherSearch = (city) => {
    const {weatherUnit, setWeather, setRecentSearches, setSearchModal} = props
    axios.get(`/api/weather/location/${city}/${weatherUnit}`).then(res => {
      setWeather(res.data)
      setRecentSearches(prevSearches => [res.data, ...prevSearches])
      setSearchModal(false)
    })
  }
    
  const handleCitiesSearch = (input) => {
    if(input.length >= 2) {
      setLoadingCities(true)
      setShowCityList(true)
      getCitiesList(input)
    } 
    if(input.length <= 2) {
      setCityList([])
    }
    if(input.length === 0){
      setLoadingCities(false)
      setShowCityList(false)
    }
  } 
  
  const handleKeyDownSearch = (event) => {
    if(event.key === "Enter") {
      weatherSearch(event.target.value)

    } 
    if(event.key === "Backspace") {
      // handleCitiesSearch(event)
    }
  }
   
  
  const mappedCitiesList = cityList.map((city, index) => {
    return(
      <div key={index} onClick={() => (weatherSearch(city.name),  setCityList([]))} className="city-list-items">
          <span>{city.name},</span>{' '}
          {city.adminDivision1 ? <span>{city.adminDivision1.name}</span> : null}{' '}
          <span>( {city.country.id} )</span>
      </div>
    )
  })

  const mappedRecentSearches = props.recentSearches.map((search, index) => {
    const{city, region, country} = search.location
    return(
      <div key={index} onClick={() => weatherSearch(city)} className="recent-search-city">
        <span><FontAwesomeIcon icon={faCity}/></span>
        <h4>{city},{' '}{region}{' '} - {' '}{country}</h4>
      </div>
    )
  })
  
  const {city, region, country} = props.currentLocation.location
  return(
      <div className="SearchModal">
        <OutsideClickHandler onOutsideClick={() => props.setSearchModal(false)}>
          <div className='search-container'>
            <div className="search-input">
              <span><FontAwesomeIcon icon={faMagnifyingGlass} /></span>
              <input 
                type="text" 
                list='cities' 
                placeholder='City, State, Country...' 
                // onChange={(e) => (handleCitiesSearch(e.target.value))}
                onKeyDown={handleKeyDownSearch}
              />
            </div>
            <span><FontAwesomeIcon icon={faX} onClick={() => props.setSearchModal(false)} /></span>
          </div>
          {showCityList ? 
            <div className="city-list-container">
              {isLoadingCities ? 
                <div className="city-list-header">
                  <RotatingLines /> 
                  <h3>Searching...</h3>
                </div>
              :
                <div className="city-list-header">
                  <h3>Search Results</h3>
                </div>
              }
              <hr/>
              {mappedCitiesList}
            </div>
          :
            null
          } 
          <h3>Current Location</h3>
          <div className="current-location-container">
            <div onClick={() => weatherSearch(city)}>
              <span><FontAwesomeIcon icon={faLocationArrow} /></span>
              <h4>{city},{' '}{region}{' '} - {' '}{country}</h4>
            </div>
          </div>
          <h3>Recent Searches</h3>
          <div className='recent-search-container'>
            {mappedRecentSearches}
          </div>
        </OutsideClickHandler>
      </div>
  )
}

export default SearchModal