import React from 'react'
import './Nav.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGear, faLocationArrow, faMagnifyingGlass, faNewspaper } from '@fortawesome/free-solid-svg-icons'

function Nav(props) {
    
  const { weatherData } = props
  return(
    <div className="Nav">
       <nav>
          <ul>
            <li><FontAwesomeIcon icon={faGear}/></li>
              <li>
                <span><FontAwesomeIcon icon={faLocationArrow}/></span>
                <marquee className='location-info-mobile' direction='left' scrollamount='2'>
                  <span>{weatherData.location.city},{weatherData.location.region}</span>
                </marquee>
                <span className='location-info'>{weatherData.location.city},{weatherData.location.region}</span>
                <span><FontAwesomeIcon icon={faMagnifyingGlass} onClick={() => props.handleToggleSearchModal()} /></span>
              </li>
              <li>
                <a href="//#News">
                <span><FontAwesomeIcon icon={faNewspaper} /></span>
                News
              </a>
            </li>
          </ul>
        </nav>
    </div>
  )
}

export default Nav