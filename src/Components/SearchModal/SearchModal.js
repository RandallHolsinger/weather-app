import React, { useState , useEffect } from 'react'
import axios from 'axios'

function SearchModal() {

    const [isLoadingCities, setLoadingCities] = useState(false)
    const [cityList, setCityList] = useState([])

    return(
        <div className="SearchModal">
          <span><FontAwesomeIcon icon={faX} onClick={() => setToggleSearch(false)} /></span>
          <span><FontAwesomeIcon icon={faMagnifyingGlass} /></span>
          <input 
            type="text" 
            list='cities' 
            placeholder='City, State, Country, Region' 
            onChange={(e) => (handleCitiesSearch(e.target.value))}
            onKeyDown={(e) => {handleOnKeyDownSearch(e.target.value)}}
          />
        </div>
    )
}

export default SearchModal