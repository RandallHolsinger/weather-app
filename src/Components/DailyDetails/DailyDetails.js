import React from 'react'
import './DailyDetails.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWind, faDroplet, faSun, faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons'

function DailyDetails(props) {

    return(
        <div className="DailyDetails">
            <ul>
                <li>
                    <label><FontAwesomeIcon icon={faWind} />{' '}Wind</label>
                    <span className="daily-details-data">Data</span>
                </li>
                <li>
                    <label><FontAwesomeIcon icon={faDroplet} />{' '}Humidity</label>
                    <span className="daily-details-data">Data</span>
                </li>
                <li>
                    <label><FontAwesomeIcon icon={faSun} />{' '}UV Index</label>
                    <span className="daily-details-data">Data</span>
                </li>
                <li>
                    <label><FontAwesomeIcon icon={faSun} /><FontAwesomeIcon icon={faArrowUp} />{' '}Sunrise</label>
                    <span className="daily-details-data">Data</span>
                </li>
                <li>
                    <label><FontAwesomeIcon icon={faSun} /><FontAwesomeIcon icon={faArrowDown} />{' '}Sunset</label>
                    <span className="daily-details-data">Data</span>
                </li>
            </ul>
        </div>
    )
}

export default DailyDetails