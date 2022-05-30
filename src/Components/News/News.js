import React, { useState, useEffect} from 'react'
import { RotatingLines } from 'react-loader-spinner'
import AllNewsModal from '../AllNewsModal/AllNewsModal'
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
        <div className="News" id='News'>
               <div className="news-container">
               <div className='container-header'><h3>News</h3></div>
               {isLoadingNews ?
                 <div className="news-loading-container">
                     <RotatingLines color='#fff' height='150' width='150'/>
                 </div>
                 :
                 <div className="news-data">
                     {
                       news[0].articles.slice(0, 3).map((article, index) => {
                           return(
                             <div key={index} onClick={() => handleClickArticle(article)} className='article-container'>
                               <div>
                                 <h5>{article.source.name}</h5>
                                 <h5>{article.publishedAt.slice(0, 10)}</h5>
                               </div>      
                               {article.urlToImage ? <img src={article.urlToImage} alt='article'/> : <img src={'images/alternate-news-image.jpg'} alt='article'/> }
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