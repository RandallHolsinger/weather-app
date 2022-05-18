import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { RotatingLines } from 'react-loader-spinner'
import FadeIn from 'react-fade-in'
import './FiveDay.css'

function FiveDay(props) {
    const [fiveDay, setFiveDay] = useState([])
    const [isLoading, setLoading] = useState(false)

    
    const getFiveDay = () => {
      const {lat, lon} = props
      console.log('5day request', lat, lon)
      axios.get(`/api/weather/fiveday/location/${lat}/${lon}`).then(res => {
        setFiveDay(res.data)
        setLoading(false)
      })
      console.log('5day data', fiveDay)
    }
    
    useEffect(() => {
       getFiveDay()
    },[fiveDay])
    
    return (
        <div className='FiveDay'>
        {isLoading ? 
          <div className='loader-container'>
            <RotatingLines width="100" strokeColor="#fff"/>
          </div>
          :
          <div className='five-day-container'>
              <FadeIn transitionDuration={1200}>
            <ul>
              <li className="day-container">
                day
                <img src="icons/c03d.png" alt="" className="day-image" />
                <div className="day-inf0">100°</div>
              </li>
              <li className="day-container">
                day
                <img src="icons/c03d.png" alt="" className="day-image" />
                <div className="day-inf0">100°</div>
              </li>
              <li className="day-container">
                day
                <img src="icons/c03d.png" alt="" className="day-image" />
                <div className="day-inf0">100°</div>
              </li>
              <li className="day-container">
                day
                <img src="icons/c03d.png" alt="" className="day-image" />
                <div className="day-inf0">100°</div>
              </li>
              <li className="day-container">
                day
                <img src="icons/c03d.png" alt="" className="day-image" />
                <div className="day-inf0">100°</div>
              </li>
            </ul>
              </FadeIn>
          </div>
        }

        </div>
    )
}

export default FiveDay