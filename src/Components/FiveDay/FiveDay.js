import React, { useState, useEffect } from 'react'
import { RotatingLines } from 'react-loader-spinner'
import FadeIn from 'react-fade-in'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDroplet } from '@fortawesome/free-solid-svg-icons'
import './FiveDay.css'

function FiveDay(props) {
    
  const [isLoading, setLoading] = useState(true)

    const checkFiveDayProps = (props) => {
      if(props) {
        setLoading(false)
        console.log('five day weather props!!!', props)
      }
    }
    
    
    
    useEffect(() => {
       checkFiveDayProps(props)
    }, [])
    
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
                <span><FontAwesomeIcon icon={faDroplet} />{' '}1%</span>
              </li>
              <li className="day-container">
                day
                <img src="icons/c03d.png" alt="" className="day-image" />
                <div className="day-inf0">100°</div>
                <span><FontAwesomeIcon icon={faDroplet} />{' '}1%</span>
              </li>
              <li className="day-container">
                day
                <img src="icons/c03d.png" alt="" className="day-image" />
                <div className="day-inf0">100°</div>
                <span><FontAwesomeIcon icon={faDroplet} />{' '}1%</span>
              </li>
              <li className="day-container">
                day
                <img src="icons/c03d.png" alt="" className="day-image" />
                <div className="day-inf0">100°</div>
                <span><FontAwesomeIcon icon={faDroplet} />{' '}1%</span>
              </li>
              <li className="day-container">
                day
                <img src="icons/c03d.png" alt="" className="day-image" />
                <div className="day-inf0">100°</div>
                <span><FontAwesomeIcon icon={faDroplet} />{' '}1%</span>
              </li>
            </ul>
              </FadeIn>
          </div>
        }

        </div>
    )
}

export default FiveDay