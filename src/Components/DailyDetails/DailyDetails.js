import React, { useState, useEffect } from 'react'
import './DailyDetails.css'
import { RotatingLines } from 'react-loader-spinner'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWind, faDroplet, faSun, faArrowUp, faArrowDown, faArrowsLeftRightToLine } from '@fortawesome/free-solid-svg-icons'

function DailyDetails(props) {

    const [isLoading, setLoading] = useState(true)

    const checkProps = (props) => {
        if(props) {
            setLoading(false)
        }
    }

    useEffect(() => {
        checkProps(props)
    }, [])
    
    const {weatherData} = props
    return(
        <div className="DailyDetails">
            {isLoading ? 
            <div className="loader-container">
                <RotatingLines width="100" strokeColor="#fff"/>
            </div>
            :
            <div className="daily-details-container">
              <h3>Daily Details</h3>
              <ul>
                  <li>
                      <label><FontAwesomeIcon icon={faWind} />{' '}Wind</label>
                      <span className="daily-details-data">{weatherData.current_observation.wind.speed}{' '}Mph</span>
                  </li>
                  <li>
                      <label><FontAwesomeIcon icon={faDroplet} />{' '}Humidity</label>
                      <span className="daily-details-data">{weatherData.current_observation.atmosphere.humidity}%</span>
                  </li>
                  <li>
                      <label><FontAwesomeIcon icon={faArrowsLeftRightToLine} />{' '}Pressure</label>
                      <span className="daily-details-data">{weatherData.current_observation.atmosphere.pressure}"</span>
                  </li>
                  <li>
                      <label><FontAwesomeIcon icon={faSun} /><FontAwesomeIcon icon={faArrowUp} />{' '}Sunrise</label>
                      <span className="daily-details-data">{weatherData.current_observation.astronomy.sunrise}</span>
                  </li>
                  <li>
                      <label><FontAwesomeIcon icon={faSun} /><FontAwesomeIcon icon={faArrowDown} />{' '}Sunset</label>
                      <span className="daily-details-data">{weatherData.current_observation.astronomy.sunset}</span>
                  </li>
              </ul>
            </div>
            }
        </div>
    )
}

export default DailyDetails