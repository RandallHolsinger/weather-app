import React, { useState, useEffect } from 'react'
import WeatherIcon from '../WeatherIcon/WeatherIcon'
import { RotatingLines } from 'react-loader-spinner'
import FadeIn from 'react-fade-in'
import './FiveDay.css'

function FiveDay(props) {
    
  const [isLoading, setLoading] = useState(true)

    const checkFiveDayProps = (props) => {
      if(props) {
        setLoading(false)
      }
    }
    
     useEffect(() => {
       checkFiveDayProps(props)
    }, [props])
    
    
    const {weatherData} = props
    return (
        <div className='FiveDay'>
          
        {isLoading ? 
          <div className='loader-container'>
            <RotatingLines width="100" strokeColor="#fff"/>
          </div>
          :
          <div className='five-day-container'>
            <FadeIn transitionDuration={1200}>
            <h3>Five Day Forcast</h3>
            <ul>
              {
                Object.entries(weatherData.forecasts).slice(0, 5).map(([index, forecast]) => {
                  return(
                    <li key={index}>
                        <h5>{forecast.day}</h5>
                        <WeatherIcon code={forecast.code} />
                        <div className="five-day-high">{forecast.high}°</div>
                        <div className="five-day-low">{forecast.low}°</div>
                    </li>
                  )
                })
              }
            </ul>
            </FadeIn>
          </div>
        }

        </div>
    )
}

export default FiveDay