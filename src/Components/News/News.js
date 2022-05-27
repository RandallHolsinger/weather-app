import React, { useState, useEffect} from 'react'
import { RotatingLines } from 'react-loader-spinner'
import NewsModal from '../NewsModal/NewsModal'
import axios from 'axios'
import './News.css'

function News() {
    
    const [news, setNews] = useState([])
    const [story, setStory] = useState({})
    const [isLoadingNews, setLoadingNews] = useState(true)
    const [allNewsModal, setAllNewsModal] = useState(true)
    const [storyModal, setStoryModal] = useState(false)

    const getNews = () => {
        axios.get('/api/news/world').then(res => {
            setNews([res.data])
            setLoadingNews(false)
            console.log(res.data, typeof(news))
        })
    }

    useEffect(() => {
        getNews()
    }, [])


    return(
        <div className="News" id='News'>
               <div className="news-container">
               <h3>News</h3>
               {isLoadingNews ?
                 <div className="news-loading-container">
                     <RotatingLines color='#fff' height='150' width='150'/>
                 </div>
                 :
                 <div className="news-data">
                     {
                       news[0].articles.slice(0, 3).map((story, index) => {
                           return(
                              <div key={index} onClick={() => (setStory(story[index]))} className='story-container'>
                                <div>
                                  <h5>{story.topic.toUpperCase()}</h5>
                                  <h5>{story.published_date.slice(0, 10)}</h5>
                                </div>      
                                <img src={story.media} alt='story'/>
                                <h4>{story.title}</h4>
                              </div>
                           )
                       })
                     }
                     <button onClick={() => setAllNewsModal(true)}>More</button>
                     {allNewsModal ? <NewsModal News={news} /> : null}
                     {storyModal ? <NewsModal story={story} /> : null}
                  </div>
                }
              </div>
        </div>
    )
}

export default News