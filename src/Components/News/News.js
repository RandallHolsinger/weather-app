import React, { useState, useEffect} from 'react'
import { RotatingLines } from 'react-loader-spinner'
import StoryModal from '../ArticleModal/ArticleModal'
import axios from 'axios'
import './News.css'

function News() {
    
    const [news, setNews] = useState([])
    const [article, setArticle] = useState({})
    const [isLoadingNews, setLoadingNews] = useState(true)
    const [articleModal, setArticleModal] = useState(false)

    const getAllNews = () => {
        axios.get('/api/news/').then(res => {
            setNews([res.data])
            console.log('new news api!!!', res.data)
            setLoadingNews(false)
        })
    } 

    const handleClickArticle = (value) => {
      setArticle(value)
      setArticleModal(true)
    }

    useEffect(() => {
        getAllNews()
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
                       news[0].articles.map((article, index) => {
                           return(
                             <div key={index} onClick={() => handleClickArticle(article)} className='article-container'>
                               <div>
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
                               <h4>{article.title}</h4>
                             </div>
                          )
                       })
                     }
                     {articleModal ? ((console.log('hitting component article', article), <StoryModal article={article} setArticleModalParent={setArticleModal}/>)) : null}
                  </div>
                }
              </div>
        </div>
    )
}

export default News