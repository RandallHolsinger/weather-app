import React, { useState, useEffect } from 'react'
import './WeatherIcon.css'

function WeatherIcon(props) {
     
    const [iconPath, setIcon] = useState()
     
    const getIconPath = (props) => {
        const {code} = props
        switch(code) {
           case 0:
               setIcon('icons/tornado.svg')
               break;
           case 1:
               setIcon('icons/thunderstorms-rain.svg')
               break;
            case 2:
               setIcon('icons/hurricane.svg')
               break;
            case 3:
               setIcon('icons/thunderstorms-rain.svg')
               break;
            case 4:
               setIcon('icons/thunderstorms.svg')
               break;
            case 5:
               setIcon('icons/sleet.svg')
               break;
            case 6:
               setIcon('icons/sleet.svg')
               break;
            case 7:
               setIcon('icons/sleet.svg')
               break;
            case 8:
               setIcon('icons/drizzle.svg')
               break;
            case 9:
               setIcon('icons/drizzle.svg')
               break;
            case 10:
               setIcon('icons/rain.svg')
               break;
            case 11:
               setIcon('icons/rain.svg')
               break;
            case 12:
               setIcon('icons/rain.svg')
               break;
            case 13:
               setIcon('icons/snow.svg')
               break;
            case 14:
               setIcon('icons/snow.svg')
               break;
            case 15:
               setIcon('icons/snow.svg')
               break;
            case 16:
               setIcon('icons/snow.svg')
               break;
            case 17:
               setIcon('icons/hail.svg')
               break;
            case 18:
               setIcon('icons/sleet.svg')
               break;
            case 19:
               setIcon('icons/dust.svg')
               break;
            case 20:
               setIcon('icons/fog.svg')
               break;
            case 21:
               setIcon('icons/haze.svg')
               break;
            case 22:
               setIcon('icons/smoke.svg')
               break;
            case 23:
               setIcon('icons/wind.svg')
               break;
            case 24:
               setIcon('icons/wind.svg')
               break;
            case 25:
               setIcon('icons/snowflake.svg')
               break;
            case 26:
               setIcon('icons/overcast.svg')
               break;
            case 27:
               setIcon('icons/overcast-night.svg')
               break;
            case 28:
               setIcon('icons/overcast-day.svg')
               break;
            case 29:
               setIcon('icons/partly-cloudy-night.svg')
               break;
            case 30:
               setIcon('icons/partly-cloudy-day.svg')
               break;
            case 31:
               setIcon('icons/clear-night.svg')
               break;
            case 32:
               setIcon('icons/clear-day.svg')
               break;
            case 33:
               setIcon('icons/partly-cloudy-night.svg')
               break;
            case 34:
               setIcon('icons/clear-day.svg')
               break;
            case 35:
               setIcon('icons/rain.svg')
               break;
            case 36:
               setIcon('icons/clear-day.svg')
               break;
            case 37:
               setIcon('icons/thunderstorms.svg')
               break;
            case 38:
               setIcon('icons/thunderstorms.svg')
               break;
            case 39:
               setIcon('icons/rain.svg')
               break;
            case 40:
               setIcon('icons/thunderstorms.svg')
               break;
            case 41:
               setIcon('icons/snow.svg')
               break;
            case 42:
               setIcon('icons/snow.svg')
               break;
            case 43:
               setIcon('icons/snow.svg')
               break;
            case 44:
               setIcon('icons/cloudy.svg')
               break;
            case 45:
               setIcon('icons/thunderstorms.svg')
               break;
            case 46:
               setIcon('icons/snow.svg')
               break;
            case 47:
               setIcon('icons/thunderstorms.svg')
               break;
            default:
               return null
        }
    }

    useEffect(() => {
        getIconPath(props)
    }, [props])




     return(
         <div className="WeatherIcon">
             <img src={`${iconPath}`} alt='icon' />
         </div>
     )

}

export default WeatherIcon

