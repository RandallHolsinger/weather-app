import React, { useState, useEffect} from 'react'
import { RotatingLines } from 'react-loader-spinner'
import ArticleModal from '../ArticleModal/ArticleModal'
import axios from 'axios'
import './News.css'

function News(props) {
    
    const [news, setNews] = useState([])
    const [isLoadingNews, setLoadingNews] = useState(true)

    const getAllNews = () => {
        axios.get('/api/news/').then(res => {
            setNews([res.data])
            setLoadingNews(false)
        })
    } 

    useEffect(() => {
        getAllNews()
    }, [])

    return(
        <div className="News">
               <h3>News</h3>
               <div className="news-container">
               {isLoadingNews ?
                 <div className="news-loading-container">
                     <RotatingLines color='#fff' height='150' width='150'/>
                 </div>
                 :
                 <div className="news-data">
                     {
                       news[0].articles.map((article, index) => {
                           return(
                             <div key={index} onClick={() => props.handleArticleModal(article)} className='article-container'>
                               <div className='article-header'>
                                 <h4>{article.source.name}</h4>
                                 <h4>{article.publishedAt.slice(0, 10)}</h4>
                               </div>      
                               {article.urlToImage ? 
                                 <img src={article.urlToImage} alt='article'/> 
                               : 
                                 <div className='alternate-container'>
                                   <img src={'images/alternate-news-image.jpg'} alt='article'/>
                                   <span className='image-footer'><a href="http://www.freepik.com"><p>Image designed by starline / freepik</p></a></span>
                                 </div>
                               }
                               <h4 className='article-footer'>{article.title}</h4>
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