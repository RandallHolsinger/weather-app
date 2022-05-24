import WeatherIcon from '../WeatherIcon/WeatherIcon'
import FadeIn from 'react-fade-in'
import './FiveDay.css'

function FiveDay(props) {
      
    const {weatherData} = props
    return (
        <div className='FiveDay'>
          <div className='five-day-container'>
            <h3>Five Day Forcast</h3>
            <ul>
              {
                Object.entries(weatherData.forecasts).slice(0, 5).map(([index, forecast]) => {
                  return(
                    <FadeIn transitionDuration={1200}>
                      <li key={index}>
                          <h5>{forecast.day}</h5>
                          <WeatherIcon code={forecast.code} />
                          <div className="five-day-high">{forecast.high}°</div>
                          <div className="five-day-low">{forecast.low}°</div>
                      </li>
                    </FadeIn>
                  )
                })
              }
            </ul>
          </div>
       

        </div>
    )
}

export default FiveDay