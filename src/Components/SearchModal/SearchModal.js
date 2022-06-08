import React, { useState, useEffect } from 'react'
import './SearchModal.css'
import {RotatingLines } from 'react-loader-spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faX } from '@fortawesome/free-solid-svg-icons'
import OutsideClickHandler from 'react-outside-click-handler';
import axios from 'axios'

function SearchModal(props) {
  
  const [isLoadingCities, setLoadingCities] = useState(false)
  const [cityList, setCityList] = useState([])
  const [recentSearches, setRecentSearches] = useState([])
  
  
  const getCitiesList = (input) => {
    axios.get(`/api/cities/${input}`).then(res => {
      setCityList(res.data)
      setLoadingCities(false)
    })
  }
  
  const weatherSearch = (city) => {
    const {weatherUnit} = props
    console.log('hitting weather search modal with unit', weatherUnit)
    axios.get(`/api/weather/location/${city}/${weatherUnit}`).then(res => {
      props.setWeather(res.data)
      console.log('1111', recentSearches)
      props.handleSearchModal()
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
      <div key={index} onClick={() => (weatherSearch(city.name), setRecentSearches(recentSearches => [city, ...recentSearches]), setCityList([]))} className="city-list-items">
          <span>{city.name},</span>{' '}
          {city.adminDivision1 ? <span>{city.adminDivision1.name}</span> : null}{' '}
          <span>( {city.country.id} )</span>
      </div>
    )
  })
  
  const mappedRecentSearches = recentSearches.map((recentSearch, index) => {
    return(
      <div key={index} className="recent-search-cities">  
        <span>{recentSearch.name},</span>{' '}
          {recentSearch.adminDivision1 ? <span>{recentSearch.adminDivision1.name}</span> : null}{' '}
        <span>( {recentSearch.country.id} )</span>
      </div>
    )
  })
  
  return(
      <div className="SearchModal">
        <OutsideClickHandler onOutsideClick={() => props.handleSearchModal()}>
          <div className='search-container'>
            <span><FontAwesomeIcon icon={faX} onClick={() => props.handleSearchModal()} /></span>
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
            {!isLoadingCities ? <div>{mappedCitiesList}</div> : null}
          </div>
          <h4>Recent Searches</h4>
          <div className="recent-search-container">
             {mappedRecentSearches}
          </div>
        </OutsideClickHandler>
      </div>
  )
}

export default SearchModal