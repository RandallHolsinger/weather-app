import React from 'react'
import './ArticleModal.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX } from '@fortawesome/free-solid-svg-icons'
import OutsideClickHandler from 'react-outside-click-handler'

function ArticleModal(props) {
    
    const {article} = props
    return(
        <div className="ArticleModal">
          <OutsideClickHandler onOutsideClick={() => props.setArticleModal(false)}>
            <div className='article-modal-header'>
              <h3>{article.source.name}</h3>
              <FontAwesomeIcon icon={faX} onClick={() => props.setArticleModal(false)}/>
            </div>
            <div className="article-content">
            {article.urlToImage ? <img src={article.urlToImage} alt='article'/> : <img src={'images/alternate-news-image.jpg'} alt='article'/> }
              <div>
                <h5>{article.source.name}</h5>
                <h5>{article.publishedAt.slice(0, 10)}</h5>
              </div>
              {article.content ? <p>{article.content.slice(0,200)}</p> 
                : 
                <div>
                  <h4>{article.title}</h4>
                  <p>Please follow link below for more information</p>
                </div>
              }
              <h5>Source Link: <a href={article.url}>{article.source.name}</a></h5>
            </div>
          </OutsideClickHandler>
        </div>
    )
}

export default ArticleModal