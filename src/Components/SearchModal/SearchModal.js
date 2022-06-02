import React, { useState , useEffect } from 'react'
import axios from 'axios'

function SearchModal() {
  const [isLoadingCities, setLoadingCities] = useState(false)
  const [cityList, setCityList] = useState([])
  
  
  const getCitiesList = (input) => {
    axios.get(`/api/cities/${input}`).then(res => {
      setCityList(res.data)
      setLoadingCities(false)
    })
  }
  const weatherSearch = (city) => {
    axios.get(`/api/weather/location/${city}`).then(res => {
      setWeather(res.data)
      console.log('weather data', res.data)
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
    


  const mappedCitiesList = cityList.map((city, index) => {
    return(
      <div key={index} onClick={() => (weatherSearch(city.name), setToggleSearch(false), setCityList([]))} className="city-list">
          <span>{city.name},</span>
          {city.adminDivision1 ? <span>{city.adminDivision1.name}</span> : null}{' '}
          <span>( {city.country.id} )</span>
      </div>
    )
  })
  return(
      <div className="SearchModal">
        <div className='search-container'>
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
        <div className="city-list-container">
          {!isLoadingCities ? {mappedCitiesList} : null}
        </div>
      </div>
  )
}

export default SearchModal