import React, { useState, useEffect } from 'react'
import './Nav.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGear, faLocationArrow, faMagnifyingGlass, faX } from '@fortawesome/free-solid-svg-icons'
import OutsideClickHandler from 'react-outside-click-handler'

function Nav(props) {

  const [showSettings, setShowSettings] = useState(false)

  const handleUnitChange = (value) => {
    props.setWeatherUnit(value)
    setShowSettings(false)
  }
      
  const { weatherData, searchModal, setSearchModal } = props
  return(
    <div className="Nav">
       <OutsideClickHandler onOutsideClick={() => setShowSettings(false)}>
         <nav>
            <ul>
              <li onClick={() => {setShowSettings(!showSettings)}}><FontAwesomeIcon icon={faGear}/></li>
              <li>
                <span><FontAwesomeIcon icon={faLocationArrow}/></span>
                <marquee className='location-info-mobile' direction='left' scrollamount='2'>
                  <span>{weatherData.location.city},{weatherData.location.region}{' - '}{weatherData.location.country}</span>
                </marquee>
                <span className='location-info'>{weatherData.location.city},{weatherData.location.region}{' - '}{weatherData.location.country}</span>
                <span><FontAwesomeIcon icon={faMagnifyingGlass} onClick={() => setSearchModal(!searchModal)} /></span>
              </li>
            </ul>
          </nav>
          {showSettings ? 
              <div className='settings-container'>
                <img src={'icons/thermometer.svg'} alt='temp' />
                <label>Units:</label>
                <div>
                  <div>
                  <input type="radio" value={'f'} checked={props.weatherUnit === 'f'} onChange={(e) => handleUnitChange(e.target.value)}/>
                  <span>°F</span>
                  </div>
                  <div>
                    <input type="radio" value={'c'} checked={props.weatherUnit === 'c'} onChange={(e) => handleUnitChange(e.target.value)}/>
                    <span>°C</span>
                  </div>
                </div>
                <span onClick={() => setShowSettings(!showSettings)}><FontAwesomeIcon icon={faX}/></span>
              </div>
            :
            null
          }
        </OutsideClickHandler>
    </div>
  )
}

export default Nav