import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './FiveDay.css'

function FiveDay() {
    const [fiveDay, setFiveDay] = useState([])
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {

    },[])

    const getFiveDay = () => {
        axios.get(`/api/weather/fiveday`).then(res => {
            setFiveDay(res.data)
            setLoading(false)
        })
    }
    
    return (
        <div className='FiveDay'>
        {isLoading ? 
          <div className='loader-container'>
            <RotatingLines width="100" strokeColor="#fff"/>
          </div>
          :
          <div className='five-day-container'>
            <table>
              <tr>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th></th>
              </tr>
              <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
              </tr>
            </table>
          </div>
        }

        </div>
    )
}

export default FiveDay