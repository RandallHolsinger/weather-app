import React, { useState, useEffect} from 'react'
import axios from 'axios'

function Nav() {

    const [toggleSearch, setToggleSearch] = useState(false)

    return(
        <div className="Nav">
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
        </div>
    )
}

export default Nav