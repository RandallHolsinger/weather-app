import WeatherIcon from '../WeatherIcon/WeatherIcon'
import FadeIn from 'react-fade-in'
import './FiveDay.css'

function FiveDay(props) {
      
    const {weatherData} = props
    
    return (
        <div className='FiveDay'>
          <div className='five-day-container'>
            <h3>Five Day Forcast</h3>
            <div className="five-day-info">
              <ul>
                {
                  Object.entries(weatherData.forecasts).slice(0, 5).map(([index, forecast]) => {
                    return(
                      <FadeIn transitionDuration={1200} key={index}>
                        <li>
                            <h5>{forecast.day}</h5>
                            <WeatherIcon code={forecast.code} />
                            <span className="five-day-high">{forecast.high}°</span>
                            <span className="five-day-low">{forecast.low}°</span>
                        </li>
                      </FadeIn>
                    )
                  })
                }
              </ul>
            </div>
          </div>
       

        </div>
    )
}

export default FiveDay