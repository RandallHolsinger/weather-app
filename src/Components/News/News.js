import React, { useState, useEffect} from 'react'
import { RotatingLines } from 'react-loader-spinner'
import axios from 'axios'
import './News.css'
import { faSliders } from '@fortawesome/free-solid-svg-icons'

function News() {
    
    const [news, setNews] = useState([])
    const [isLoadingNews, setLoadingNews] = useState(true)

    const getNews = () => {
        axios.get('/api/news/world').then(res => {
            setNews([...news, res.data])
            setLoadingNews(false)
            console.log(res.data, typeof(news))
        })
    }

    useEffect(() => {
        getNews()
    }, [])



    return(
        <div className="News">
               <div className="news-container">
               <h3>News</h3>
               {isLoadingNews ?
                 <div className="news-loading-container">
                     <RotatingLines color='#fff' height='150' width='150'/>
                 </div>
                 :
                 <div className="news-data">
                     {
                       news[0].articles.slice(0, 5).map((story, index) => {
                           return(
                               <div key={index} className='story-container'>
                                   <img src={story.media} alt='story'/>
                                   <div className="news-content">
 
                                   </div>
                               </div>
                           )
                       })
                     }
                  </div>
                }
              </div>
        </div>
    )
}

export default News